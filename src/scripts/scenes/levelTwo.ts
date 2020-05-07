import Player from "../objects/Player";
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "../objects/Inventory";
import { Element } from "../objects/Element";
import { Lab } from "../objects/Lab";
import BasicAttack from "../objects/attacks/BasicAttack"

// CONSTANTS
const jumpHeight: number = -1200;
const runSpeed: number = 500;

export default class MainScene extends Phaser.Scene {

  // Game vars
  private background;
  private map;
  private cursors;
  private tileset;
  private text;
  private invButton;
  private inventory: Inventory;
  private lab: Lab;
  private boss: GameObjects.Image;

  // BG Music
  private bgMusic: Phaser.Sound.BaseSound;

  // Player
  player;
  playerDirection: number;

  // Attack Projectiles
  projectiles: GameObjects.Group;

  // Map Layers
  private platforms;
  private waterLayer;
  private exitLayer;


  // Game Objects
  private hints;
  private exitObjects;
  private waterObjects;
  private oxygenObjects;
  private hydrogenObjects;
  lavaObjects: Physics.Arcade.Group;

  hintsArray: Array<Phaser.GameObjects.Text>;
  hintsXPos: Array<number>;
  hintStrings: Array<string>;


  // Game Over
  private gameOver: boolean;
  private gameText: Phaser.GameObjects.Text;

  // Game Config
  gameWidth: number;
  gameHeight: number;

  constructor() {
    super({ key: 'LevelTwoScene' });
  }




  // -- START INITIALIZE FUNCTIONS --
  initializeText() {
    this.gameText = this.add.text(this.gameWidth / 2 - 270, this.gameHeight / 3, "Press R to Restart");
    this.gameText.setStyle({
      fontSize: '64px',
      fontFamily: 'Arial',
      color: '#ffffff',
      thickness: 5,
      align: 'center'
    });
    this.gameText.setScrollFactor(0);
    this.gameText.setStroke("000000", 5);
    this.gameText.setDepth(9999);
    this.gameText.setVisible(false);
  }

  initializeBackground() {
    // PARALLAX BG
    this.background = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, "background").setOrigin(0, 0).setScrollFactor(0);
    this.background.tilePositionX = this.cameras.main.scrollX * .3;
  }

  initializeMusic() {
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
  }

  initializeMap() {
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');

    this.platforms = this.map.createStaticLayer('Ground', this.tileset, 0, 30);
    this.platforms.setCollisionByExclusion(-1);

    this.exitLayer = this.map.createStaticLayer('ExitTile', this.tileset, 0, 30);
  }

  initializeMapObjects() {
    // add exit to map
    this.exitObjects = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.loadTiledObjects(this.exitObjects, 'Exit', 'exitopenobject')
    this.physics.add.overlap(this.player, this.exitObjects, this.collideExit, undefined, this);

    // add water collisions
    this.lavaObjects = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.loadTiledObjects(this.lavaObjects, 'Lava', 'lavaobject')
    this.physics.add.overlap(this.player, this.lavaObjects, this.collideWater, undefined, this);
  }

  initializePlayer() {
    this.player = this.physics.add.sprite(140, 140, 'playerIdle');
    this.setSpriteProperties(this.player)
  }

  initializeCamera() {
    this.physics.world.setBounds(0, 0, this.map.width * 70, this.map.height * 70);
    this.cameras.main.setBounds(0, 0, this.map.width * 70, this.map.height * 70);
    this.cameras.main.startFollow(this.player);
  }

  initializeLab() {
    //inventory menu in scene
    this.inventory = new Inventory(this, 2 * this.game.canvas.width / 3, this.game.canvas.height / 2);

    //lab menu in scene
    this.lab = new Lab(this,this.player, this.inventory);
    this.lab.makeCells(this);


    this.invButton = this.add.image(80, 80, 'inventoryButton').setScale(0.2);
    this.invButton.setScrollFactor(0);
    this.invButton.alpha = .5;
    this.invButton.setInteractive();
    this.invButton.on("pointerover", () => {
      // console.log("hover");
      this.invButton.alpha = 1;
    });

    this.invButton.on("pointerout", () => {
      // console.log("nah");
      this.invButton.alpha = .5;
    });

    this.invButton.on("pointerup", () => {
      // console.log("pause?");
      if (this.inventory.getDisplay().visible === true) {
        this.inventory.setVis(false);
        // console.log(this.inventory.visible);
      }
      else {
        this.inventory.refreshRender();
        this.lab.clearCells();
        this.inventory.setVis(true);
        // console.log(this.inventory.visible);
      }
      // this.scene.pause();
      // this.scene.launch('labScene');
    });
  }

  initializeProjectiles() {
    this.projectiles = this.add.group({
      classType: BasicAttack,
      runChildUpdate: true
    });

    this.physics.add.collider(this.projectiles, this.platforms, function (projectile, platform) {
      projectile.destroy();
    });
  }
  // -- END INITIALIZE FUNCTIONS --





  // -- START HELPER FUNCTIONS --
  stopMusic() {
    this.bgMusic.stop();
  }


  performAttack() {
    let attack = new BasicAttack(this, this.playerDirection);
  }

  setSpriteProperties(sprite) {
    sprite.setBounce(0.1);
    sprite.setCollideWorldBounds(true);
    sprite.setScale(1.5);
    this.physics.add.collider(sprite, this.platforms);
    sprite.setDepth(1)
  }

  /**
   * Load objects from Tiled JSON file into the game and display them
   * @param objectGroup defined var for group of objects to load
   * @param tiledName name of the object in the Tiled JSON file (e.g. 'Hint', 'Hydrogen', 'Oxygen', etc.)
   * @param assetName name of the objects image you define in preloadScene (e.g. 'hint', 'hydrogenTemp', etc.)
   */
  loadTiledObjects(objectGroup: Phaser.Physics.Arcade.Group, tiledName: string, assetName: string) {
    const hintObject = this.map.getObjectLayer(tiledName)['objects'];

    hintObject.forEach(obj => {
      const object = objectGroup.create(obj.x, obj.y + 30 - obj.height, assetName).setOrigin(0, 0);
      object.body.setSize(object.width, object.height);
      object.setDepth(0);
    });
  }

  // Keyboard Input
  handleKeyboardInput() {
    // Move left or right
    if (this.cursors.left.isDown) {
      this.playerDirection = -1;
      this.player.setVelocityX(-runSpeed);

      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    } else if (this.cursors.right.isDown) {
      this.playerDirection = 1;
      this.player.setVelocityX(runSpeed);
      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    } else {
      this.player.setVelocityX(0);

      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }

    // Jump
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(jumpHeight);
      this.player.play('jump', true);
    }

    // Fall down faster
    if (this.cursors.down.isDown && !this.player.body.onFloor()) {
      this.player.setVelocityY(1000);
      this.player.play('jump', true);
    }

    // Attack
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
      this.performAttack();
      this.player.play('idle', true)
    }

    // Open Lab
    let keyL = this.input.keyboard.addKey('L');
    if (this.input.keyboard.checkDown(keyL, 1000)) {

      if (this.inventory.getDisplay().visible === true) {
        this.inventory.setVis(false);
        // console.log(this.inventory.visible);
      }
      else {
        this.inventory.refreshRender();
        this.inventory.setVis(true);
        // console.log(this.inventory.visible);
      }
    }
  }
  // -- END HELPER FUNCTIONS --




  // -- START COLLISION FUNCTIONS --
  collideExit() {
    this.stopMusic();

    this.scene.restart();
  }

  collideWater() {
    this.gameOver = true;
  }

  collideHint(player) {
    let hintNumber: number = 4;
    for (let i = 0; i < this.hintsXPos.length; i++) {
      if (player.x > this.hintsXPos[i] - player.width && player.x < this.hintsXPos[i] + player.width)
        this.hintsArray[i].setVisible(true);
      else
        this.hintsArray[i].setVisible(false);
    }
  }

  collideHydrogen(player, hydrogen) {
    // add to inventory
    let item: Element = new Element("Hydrogen", "H", "description text", 1, 1, this.add.image(0, 0, "hydrogen"));
    this.inventory.addItem(this, item);
    this.lab.makeCollision(this, item);

    // destroy the hydrogen
    hydrogen.disableBody(true, true);
  }

  collideOxygen(player, oxygen) {
    let item: Element = new Element("Oxygen", "O", "description text", 2, 2, this.add.image(0, 0, "oxygen"));
    this.inventory.addItem(this, item);
    this.lab.makeCollision(this, item);

    oxygen.disableBody(true, true);
  }
  // -- END COLLISION FUNCTIONS --




  create() {
    this.gameOver = false;
    this.playerDirection = 1;
    this.gameWidth = this.game.canvas.width;
    this.gameHeight = this.game.canvas.height;

    // fixes phasing through floor error
    this.physics.world.TILE_BIAS = 32;

    // Set Level
    this.map = this.add.tilemap('Level_2');

    // get user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Inits
    this.initializeText();
    this.initializeBackground()
    this.initializeMusic();
    this.initializeMap();
    this.initializePlayer();
    this.initializeMapObjects();
    this.initializeCamera();
    this.initializeLab();
    this.initializeProjectiles();
  }

  update() {
    console.log("LEVEL TWO RUNNING")

    if (this.gameOver) {
      this.stopMusic();
      this.player.setCollideWorldBounds(false);

      this.player.setVelocityX(1000)
      if (this.player.x >= this.map.width * 70)
        this.player.setVelocityX(0)

      this.gameText.setVisible(true);


      //Restart when we press R
      var rKey = this.input.keyboard.addKey("R");
      if (rKey.isDown) {
        this.gameText.destroy();
        this.scene.restart();
      }
    } else {
      this.handleKeyboardInput();


      if (this.player.body.velocity.x > 0) {
        this.player.setFlipX(false);
      } else if (this.player.body.velocity.x < 0) {
        this.player.setFlipX(true);
      }
    }

  }
}