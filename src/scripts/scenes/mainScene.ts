import Player from "../objects/Player";
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "../objects/Inventory";
import { Element } from "../objects/Element";
import { Lab } from "../objects/Lab";
import BasicAttack from "../objects/attacks/BasicAttack"

  // CONSTANTS
  const jumpHeight : number = -1200;
  const runSpeed : number = 500;
export default class MainScene extends Phaser.Scene {
  
private background;
private map;
private cursors;
private tileset;
private text;
private invButton;
private inventory: Inventory;
private lab: Lab;
private enemy: GameObjects.Image;

// Attack
projectiles: GameObjects.Group;
playerDirection: number;

// Tiled Layers
private platforms;
private waterTiles;
private waterLayer;
private exitTiles;
private exitLayer;

// Tiled Objects
private hints;
private oxygenObjects;
private hydrogenObjects;

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
    this.map = this.add.tilemap('Level_1');
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');
    
    this.platforms = this.map.createStaticLayer('Ground', this.tileset, 0, 30);
    this.platforms.setCollisionByExclusion(-1);

    this.waterLayer = this.map.createStaticLayer('Water', this.tileset, 0, 30);
    this.exitLayer = this.map.createStaticLayer('Exit', this.tileset, 0, 30);
    this.exitLayer.setTileIndexCallback(82, this.collideExit, this)
    // player stuff
    this.player = this.physics.add.sprite(10,this.game.canvas.height - (this.game.canvas.height/4), 'playerIdle');
    this.setSpriteProperties(this.player)
    this.playerDirection = 1;

    // get user input
    this.cursors = this.input.keyboard.createCursorKeys();
  

    // hint stuff
    this.hintsArray = [];
    this.hintsXPos = [];
    this.hintStrings = ["Pick up elements by walking over them", 
                        "Attack enemies using spacebar",
                        "Combine elements by pressing 'L' or clicking the book on the top left",
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
    this.loadTiledObjects(this.hydrogenObjects, 'Hydrogen', 'hydrogen')
    this.physics.add.overlap(this.player, this.hydrogenObjects, this.collideHydrogen, undefined, this);

    // add oxygen to map
    this.oxygenObjects = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.loadTiledObjects(this.oxygenObjects, 'Oxygen', 'oxygen')
    this.physics.add.overlap(this.player, this.oxygenObjects, this.collideOxygen, undefined, this);


    // follow player with camera
    this.physics.world.setBounds(0,0,7000, 1080);
    this.cameras.main.setBounds(0, 0, 7000, 1080);
    this.cameras.main.startFollow(this.player);

    //inventory menu in scene
    this.inventory = new Inventory(this, 2 * this.game.canvas.width/3, this.game.canvas.height/2);
    
    //lab menu in scene
    this.lab = new Lab(this, this.inventory);
    this.lab.makeCells(this);
    

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
      if(this.inventory.getDisplay().visible === true){
        this.inventory.setVis(false);
        // console.log(this.inventory.visible);
      }
      else{
        this.inventory.refreshRender();
        this.inventory.setVis(true);
        // console.log(this.inventory.visible);
      }
      // this.scene.pause();
      // this.scene.launch('labScene');
    });


    // Attack projectile stuff
    this.projectiles = this.add.group({
      classType: BasicAttack,
      runChildUpdate: true
    });

    this.physics.add.collider(this.projectiles, this.platforms, function(projectile, platform){
      projectile.destroy();
    });

  }

  update() {
    //console.log(this.map.getTileAtWorldXY(this.player.x, this.player.y))
    // handle collisions
    // this.collideWater();
    // this.collideExit();

    this.handleKeyboardInput();


    if(this.player.body.velocity.x > 0){
      this.player.setFlipX(false);
    }else if (this.player.body.velocity.x < 0){
      this.player.setFlipX(true);
    }
  }

  // Keyboard Input
  handleKeyboardInput() {
    // Move left or right
    if(this.cursors.left.isDown){
      this.playerDirection = -1;
      this.player.setVelocityX(-runSpeed);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else if (this.cursors.right.isDown){
      this.playerDirection = 1;
      this.player.setVelocityX(runSpeed);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else {
      this.player.setVelocityX(0);

      if(this.player.body.onFloor()){
        this.player.play('idle', true);
      }
    }

    // Jump
    if(this.cursors.up.isDown && this.player.body.onFloor()){
      this.player.setVelocityY(jumpHeight);
      this.player.play('jump', true);
    }

    // Fall down faster
    if(this.cursors.down.isDown && !this.player.body.onFloor()){
      this.player.setVelocityY(750);
      this.player.play('jump', true);
    }

    // Attack
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(Phaser.Input.Keyboard.JustDown(spaceKey)) {
      this.performAttack();
      this.player.play('attack1', true)
      console.log("pew pew");
    }

    // Open Lab
    let keyL = this.input.keyboard.addKey('L');
    if(this.input.keyboard.checkDown(keyL, 1000)) {
      console.log("L is down");
      if(this.inventory.getDisplay().visible === true){
        this.inventory.setVis(false);
        // console.log(this.inventory.visible);
      }
      else{
        this.inventory.refreshRender();
        this.inventory.setVis(true);
        // console.log(this.inventory.visible);
      }
    }
  }

  performAttack() {
    let attack = new BasicAttack(this, this.playerDirection);
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
  collideExit() {
      console.log("In exit hehe");
  }
  
  collideWater(){
      console.log("In water hehe")
  }

  collideHint(player) {
    let hintNumber:number = 4;
    for(let i = 0; i < this.hintsXPos.length; i++) {
      if(player.x > this.hintsXPos[i] - player.width && player.x < this.hintsXPos[i] + player.width)
        this.hintsArray[i].setVisible(true);
      else 
        this.hintsArray[i].setVisible(false);
    }
  }

  collideHydrogen(player, hydrogen) {
    // console.log("Colliding with hydrogen")
    // add to inventory here
    let item: Element = new Element("Hydrogen", "H", "description text", 1, 1, new Phaser.Physics.Arcade.Image(this,0, 0, "hydrogenTemp"));
    this.inventory.addItem(this, item);
    this.lab.makeCollision(this, item);

    // destroy the hydrogen
    hydrogen.disableBody(true, true);
  }

  collideOxygen(player, oxygen) {
    // console.log("Colliding with oxygen")

    // add to inventory here
    let item: Element = new Element("Oxygen", "O", "description text", 2, 2, new Phaser.Physics.Arcade.Image(this,0, 0, "oxygenTemp"));
    this.inventory.addItem(this, item);
    this.lab.makeCollision(this, item);

    // destroy oxygen object
    oxygen.disableBody(true, true);
  }
  // -- END COLLISION FUNCTIONS --

}