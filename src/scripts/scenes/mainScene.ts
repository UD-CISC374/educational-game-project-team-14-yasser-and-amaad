import Player from "../objects/Player";
import { GameObjects, Display } from "phaser"
import { Inventory } from "../objects/Inventory";

  // CONSTANTS
  const jumpHeight : number = -750  ;

export default class MainScene extends Phaser.Scene {
  
private background;
private map;
private cursors;
private tileset;
private text;
private platforms;
private water;
private hints;
private invButton;
private inventoryDisplay: GameObjects.Container;
private enemy: GameObjects.Image;

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
    this.enemy = this.add.image(0,0,'enemy');

    // onLoad
    this.gameWidth = this.game.canvas.width;
    this.gameHeight = this.game.canvas.height;
    this.hintsArray = [];
    this.hintsXPos = [];
    this.hintStrings = ["Pick up elements by walking over them", 
                        "Attack enemies using spacebar",
                        "Combine elements by press 'L' or clicking the book on the top left",
                        "Move on to the next level by going into the exit door"]

    // PARALLAX BG
    this.background = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, "background").setOrigin(0,0).setScrollFactor(0);
    this.background.tilePositionX = this.cameras.main.scrollX * .3;

    this.map = this.add.tilemap('L1');
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');
    this.platforms = this.map.createStaticLayer('Ground', this.tileset, 0, 30);
    this.platforms.setCollisionByExclusion(-1, true);

    this.water = this.map.createStaticLayer('Water', this.tileset, 0, 30);
    this.water.setCollisionByExclusion(-1, true);
    this.physics.add.overlap(this.water, this.player, this.playerHit, undefined, this);

    this.player = this.physics.add.sprite(10,this.game.canvas.height - (this.game.canvas.height/4), 'playerIdle');
    console.log(typeof this.player);
    this.setSpriteProperties(this.player)

    this.cursors = this.input.keyboard.createCursorKeys();

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

      this.hintsArray.push(this.add.text(hintObject.x + 30, hintObject.y - hintObject.height*2 , this.hintStrings[counter], {color: 'BLACK'})
                          .setVisible(true)
                          .setOrigin(0.5)
                          .setAlign('center'));
      this.hintsXPos.push(hintObject.x);
      counter++;
    });

    this.physics.add.overlap(this.hints, this.player, this.playerHit, undefined, this);

    this.physics.world.setBounds(0, 0, 7000, 1080);
    this.cameras.main.setBounds(0, 0, 7000, 1080);
    this.cameras.main.startFollow(this.player);

    //inventoryDisplay menu in scene
    this.inventoryDisplay = this.add.container(2 * this.game.canvas.width/3, this.game.canvas.height/2).setName("pInventory");
    this.inventoryDisplay.setVisible(false);
    
    var tempRect = this.add.rectangle(0, 0, this.game.canvas.width/4, this.game.canvas.height/2, 0xffffff, 1);
    var tempCell:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0xff0000,1).setOrigin(0,0).setDepth(21);
    var tempCell1:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0x00ff00,1).setOrigin(0,0);
    var tempCell2:GameObjects.Rectangle = this.add.rectangle(0, 0, this.game.canvas.width/12, this.game.canvas.height/8, 0x0000ff,1).setOrigin(0,0);
    this.inventoryDisplay.setScrollFactor(0);
    
    this.inventoryDisplay.add(tempRect)
    this.inventoryDisplay.add(tempCell);
    this.inventoryDisplay.add(tempCell1);
    this.inventoryDisplay.add(tempCell2);

    Display.Align.In.TopRight(tempCell,tempRect);
    Display.Align.In.TopCenter(tempCell1,tempRect);
    Display.Align.In.TopLeft(tempCell2,tempRect);


    tempCell.setInteractive();
    tempCell1.setInteractive();
    tempCell2.setInteractive();

    this.input.setDraggable(tempCell);
    this.input.setDraggable(tempCell1);
    this.input.setDraggable(tempCell2);
    // this.inventoryDisplay.setInteractive();
    console.log(this.inventoryDisplay.length);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
  })

    this.invButton = this.add.image(80, 80, 'inventory').setScale(0.2);
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
      if(this.inventoryDisplay.visible){
        this.inventoryDisplay.setVisible(false);
        // console.log(this.inventoryDisplay.visible);
      }
      else{
        this.inventoryDisplay.setVisible(true);
        // console.log(this.inventoryDisplay.visible);
      }
      // this.scene.pause();
      // this.scene.launch('labScene');
    });

  }

  playerHit(){

  }

  update() {
    if(this.cursors.left.isDown){
      this.player.setVelocityX(-300);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else if (this.cursors.right.isDown){
      this.player.setVelocityX(300);
      if(this.player.body.onFloor()){
        this.player.play('run', true);
      }
    }else {
      this.player.setVelocityX(0);

      if(this.player.body.onFloor()){
        this.player.play('idle', true);
      }
    }

    if((this.cursors.space.isDown || this.cursors.up.isDown) /*&& this.player.body.onFloor()*/){
      this.player.setVelocityY(jumpHeight);
      this.player.play('jump', true);
    }

    if(this.cursors.down.isDown && !this.player.body.onFloor()){
      this.player.setVelocityY(800)
      this.player.play('jump', true);
    }

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

}