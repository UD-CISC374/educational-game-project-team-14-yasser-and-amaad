import Player from "../objects/Player";
import { GameObjects, Display } from "phaser"
import { Inventory } from "../objects/Inventory";
import { Element } from "../objects/Element";

  // CONSTANTS
  const jumpHeight : number = -1000  ;

export default class MainScene extends Phaser.Scene {
  
private background;
private map;
private cursors;
private tileset;
private text;
private invButton;
private inventory: Inventory;
private enemy: GameObjects.Image;

// Tiled Layers
private platforms;
private water;

// Tiled Objects
private hints;
private oxygenObjects;
private hydrogenObjects;

//
private inAir:boolean;
// bg music + audio
private bgMusic:Phaser.Sound.BaseSound;
// game config
gameWidth : number;
gameHeight : number;
  
  // player stuff
  player;
  
  // hint arrays
  hintsArray : Array<Phaser.GameObjects.Text>;
  hintsXPos : Array<number>;
  hintStrings : Array<string>;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.gameWidth = this.game.canvas.width;
    this.gameHeight = this.game.canvas.height;

    // fixes phasing through floor error
    this.physics.world.TILE_BIAS = 32;

    // PARALLAX BG
    this.background = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, "background").setOrigin(0,0).setScrollFactor(0);
    this.background.tilePositionX = this.cameras.main.scrollX * .3;

    // bg music
    this.bgMusic = this.sound.add("bg_netherplace");
    let musicConfig = {
      mute: false,
      volume: .01,
      rate: 1,
      detune: 1,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.bgMusic.play(musicConfig);

    // map stuff
    this.map = this.add.tilemap('L1_2');
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');
    this.platforms = this.map.createStaticLayer('Ground', this.tileset, 0, 30);
    this.platforms.setCollisionByExclusion(-1, true);

    this.water = this.map.createStaticLayer('Water', this.tileset, 0, 30);
    this.water.setCollisionByExclusion(-1, true);
    this.physics.add.overlap(this.water, this.player, this.collideWater, undefined, this);

    // player stuff
    this.player = this.physics.add.sprite(10,this.game.canvas.height - (this.game.canvas.height/4), 'playerIdle');
    console.log(typeof this.player);
    this.setSpriteProperties(this.player)

    // get user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // hint stuff
    this.hintsArray = [];
    this.hintsXPos = [];
    this.hintStrings = ["Pick up elements by walking over them", 
                        "Attack enemies using spacebar",
                        "Combine elements by press 'L' or clicking the book on the top left",
                        "Move on to the next level by going into the exit door"];

    this.hints = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    const hintObject = this.map.getObjectLayer('Hint')['objects'];
    let counter = 0;
    hintObject.forEach(hintObject => {
      const hint = this.hints.create(hintObject.x, hintObject.y + 30 - hintObject.height, 'hint').setOrigin(0,0);
      hint.body.setSize(hint.width, hint.height);
      hint.setDepth(1);

      this.hintsArray.push(
        this.add.text(hintObject.x + 30, hintObject.y - hintObject.height*2 , this.hintStrings[counter], {color: 'BLACK'})
                          .setVisible(false)
                          .setOrigin(0.5)
                          .setAlign('center'));
      this.hintsXPos.push(hintObject.x);
      counter++;
    });
    this.physics.add.overlap(this.player, this.hints, this.collideHint, undefined, this);


    // add hydrogen to map
    this.hydrogenObjects = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.loadTiledObjects(this.hydrogenObjects, 'Hydrogen', 'hydrogenTemp')
    this.physics.add.overlap(this.player, this.hydrogenObjects, this.collideHydrogen, undefined, this);

    // add oxygen to map
    this.oxygenObjects = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.loadTiledObjects(this.oxygenObjects, 'Oxygen', 'oxygenTemp')
    this.physics.add.overlap(this.player, this.oxygenObjects, this.collideOxygen, undefined, this);


    // follow player with camera
    this.physics.world.setBounds(0,0,7000, 1080);
    this.cameras.main.setBounds(0, 0, 7000, 1080);
    this.cameras.main.startFollow(this.player);

    //inventory menu in scene
    this.inventory = new Inventory(this, 2 * this.game.canvas.width/3, this.game.canvas.height/2);
    
    // var tempRect = this.add.rectangle(0, 0, this.game.canvas.width/4, this.game.canvas.height/2, 0xffffff, 1);
    // var tempCell:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0xff0000,1).setOrigin(0,0).setDepth(21);
    // var tempCell1:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0x00ff00,1).setOrigin(0,0);
    // var tempCell2:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0x0000ff,1).setOrigin(0,0);
    
    // let hydrogen: Element = new Element("Hydrogen", "H", "description text", 1, 1, this.add.image(0, 0, "hydrogen"));
    // this.inventory.addItem(this, hydrogen);
    




    // tempCell.setInteractive();
    // tempCell1.setInteractive();
    // tempCell2.setInteractive();

    // this.input.setDraggable(tempCell);
    // this.input.setDraggable(tempCell1);
    // this.input.setDraggable(tempCell2);
    // this.inventory.setInteractive();
    // console.log(this.inventory.length);

    this.invButton = this.add.image(80, 80, 'inventoryButton').setScale(0.2);
    this.invButton.setScrollFactor(0);
    this.invButton.alpha = .5;
    this.invButton.setInteractive();
    this.invButton.on("pointerover",()=>{
      // console.log("hover");
      this.invButton.alpha = 1;
    });

    this.invButton.on("pointerout",()=>{
      // console.log("nah");
      this.invButton.alpha = .5;
    });

    this.invButton.on("pointerup", ()=>{
      // console.log("pause?");
      if(this.inventory.visible === true){
        this.inventory.setVis(false);
        // console.log(this.inventory.visible);
      }
      else{
        this.inventory.refreshRender(this);
        this.inventory.setVis(true);
        // console.log(this.inventory.visible);
      }
      // this.scene.pause();
      // this.scene.launch('labScene');
    });

  }

  update() {

    if(this.cursors.left.isDown){
      this.player.setVelocityX(-500);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else if (this.cursors.right.isDown){
      this.player.setVelocityX(500);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else {
      this.player.setVelocityX(0);

      if(this.player.body.onFloor()){
        this.player.play('idle', true);
      }
    }

    if(this.cursors.up.isDown && this.player.body.onFloor()){
      this.player.setVelocityY(jumpHeight);
      this.player.play('jump', true);
    }

    if(this.cursors.down.isDown && !this.player.body.onFloor()){
      this.player.setVelocityY(750)
      this.player.play('jump', true);
    }

    if(this.cursors.space.isDown) {
      this.player.play('attack1', true)
    }

    // if(!this.player.body.onFloor() && this.player.body.velocity.y > 300){
    //   this.player.play('fall');
    // }

    if(this.player.body.velocity.x > 0){
      this.player.setFlipX(false);
    }else if (this.player.body.velocity.x < 0){
      this.player.setFlipX(true);
    }
  }

  setSpriteProperties(sprite) {
    sprite.setBounce(0.1);
    sprite.setCollideWorldBounds(true);
    sprite.setScale(1.5);
    this.physics.add.collider(sprite, this.platforms);
    sprite.setDepth(5)
  }

  /**
   * Load objects from Tiled JSON file into the game and display them
   * @param objectGroup defined var for group of objects to load
   * @param tiledName name of the object in the Tiled JSON file (e.g. 'Hint', 'Hydrogen', 'Oxygen', etc.)
   * @param assetName name of the objects image you define in preloadScene (e.g. 'hint', 'hydrogenTemp', etc.)
   */
  loadTiledObjects(objectGroup: Phaser.Physics.Arcade.Group,tiledName: string, assetName: string) {
    const hintObject = this.map.getObjectLayer(tiledName)['objects'];

    hintObject.forEach(obj => {
      const object = objectGroup.create(obj.x, obj.y + 30 - obj.height, assetName).setOrigin(0,0);
      object.body.setSize(object.width, object.height);
      object.setDepth(1);
    });
  }

  // -- START COLLISION FUNCTIONS --
  collideWater(){
    console.log("Player in water")
  }

  collideHint(player, hint) {
    let hintNumber:number = 4;
    for(let i = 0; i < this.hintsXPos.length; i++) {
      if(player.x > this.hintsXPos[i] - player.width && player.x < this.hintsXPos[i] + player.width){
        console.log("Player between hint[%d] = ", i, player.x > this.hintsXPos[i] - player.width && player.x < this.hintsXPos[i] + player.width);
        this.hintsArray[i].setVisible(true);
      }
      else {
        this.hintsArray[i].setVisible(false);
      }
    }
  }

  collideHydrogen(player, hydrogen) {
    console.log("Colliding with hydrogen")
    // add to inventory here
    let item: Element = new Element("Hydrogen", "H", "description text", 1, 1, this.add.image(0, 0, "hydrogenTemp"));
    this.inventory.addItem(this, item);

    // destroy the hydrogen
    hydrogen.disableBody(true, true);
  }

  collideOxygen(player, oxygen) {
    console.log("Colliding with oxygen")

    // add to inventory here
    let item: Element = new Element("Oxygen", "O", "description text", 2, 2, this.add.image(0, 0, "oxygenTemp"));
    this.inventory.addItem(this, item);

    // destroy oxygen object
    oxygen.disableBody(true, true);
  }
  // -- END COLLISION FUNCTIONS --

}