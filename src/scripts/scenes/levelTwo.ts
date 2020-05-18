import Player from "../objects/Player";
import { GameObjects, Display, Physics, Scene } from "phaser"
import { Inventory } from "../objects/Inventory";
import { Element } from "../objects/Element";
import { Lab } from "../objects/Lab";
import BasicAttack from "../objects/attacks/BasicAttack"
import Enemy from "../objects/Enemy";

// CONSTANTS
const jumpHeight: number = -1500;
const runSpeed: number = 2000;
const startXIndex: number = 0;
const startYIndex: number = 2;
const TILE_WIDTH: number = 70;

export default class LevelOneScene extends Phaser.Scene {

    // Game vars
    private background;
    private map;
    private cursors;
    private tileset;
    private text;
    private invButton;
    private inventory: Inventory;
    private lab: Lab;

    // BG Music
    private bgMusic: Phaser.Sound.BaseSound;

    // Player
    player:Player;
    playerDirection: number;

    //Enemies
    private enemies: Enemy[] = [];
    private enemiesGroup: GameObjects.Group;

    // Attack Projectiles
    projectiles: GameObjects.Group;

    // Map Layers
    private platforms;
    private lavaLayer;
    private exitLayer;
    private invisWalls;

    // Game Objects
    private hints;
    private walls;
    private exitObjects;
    private lavaObjects;
    private oxygenObjects;
    private hydrogenObjects;
    private heliumObjects;

    // Hints
    hintsArray: Array<Phaser.GameObjects.Text>;
    hintImages: Array<Phaser.GameObjects.Image>;
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
    initText() {
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

    initBackground() {
        // PARALLAX BG
        this.background = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, "background").setOrigin(0, 0).setScrollFactor(0);
        this.background.tilePositionX = this.cameras.main.scrollX * .3;
    }

    initMap() {
        this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');

        this.platforms = this.map.createStaticLayer('PlatformTile', this.tileset, 0, 30);
        this.platforms.setCollisionByExclusion(-1);

        this.lavaLayer = this.map.createStaticLayer('LavaTile', this.tileset, 0, 30);
        this.exitLayer = this.map.createStaticLayer('ExitTile', this.tileset, 0, 30);
    }

    initHints() {
        // hint stuff
        this.hintsArray = [];
        this.hintImages = [];
        this.hintsXPos = [];
        this.hintStrings = ["Open the lab and add 'He' to the magic ball"];

        this.hints = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const hintObject = this.map.getObjectLayer('HintObj')['objects'];
        let counter = 0;
        hintObject.forEach(hintObject => {
            const hint = this.hints.create(hintObject.x, hintObject.y + 30 - hintObject.height, 'hint').setOrigin(0, 0);
            hint.body.setSize(hint.width, hint.height);
            hint.setDepth(0);

            this.hintsArray.push(
                this.add.text(hintObject.x + 30, hintObject.y - hintObject.height * 2, this.hintStrings[counter], { color: 'BLACK' })
                    .setVisible(false)
                    .setOrigin(0.5)
                    .setAlign('center'));
            
            if(counter !== 2){
                this.hintImages.push(this.add.image(hintObject.x + 30, hintObject.y - hintObject.height * 2 - 60, "blank").setVisible(false));
            } else {
                this.hintImages.push(this.add.image(hintObject.x + 30, hintObject.y - hintObject.height * 2 - 60, "h2o").setVisible(false));
            }
                   
            this.hintsXPos.push(hintObject.x);
            counter++;
        });
        this.physics.add.overlap(this.player, this.hints, this.collideHint, undefined, this);
    }

    initWalls() {
        // add walls to map
        this.walls = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const wallObjects = this.map.getObjectLayer('WallObj')['objects'];
        wallObjects.forEach(wallObject => {
            const wall = this.walls.create(wallObject.x, wallObject.y + 30 - wallObject.height, 'wall').setOrigin(0, 0);
            wall.setVisible(false);
        });
    }

    initMapObjects() {
        // add hydrogen to map
        this.hydrogenObjects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.loadTiledObjects(this.hydrogenObjects, 'HydrogenObj', 'hydrogen')
        this.physics.add.overlap(this.player, this.hydrogenObjects, this.collideHydrogen, undefined, this);

        // add oxygen to map
        this.oxygenObjects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.loadTiledObjects(this.oxygenObjects, 'OxygenObj', 'oxygen')
        this.physics.add.overlap(this.player, this.oxygenObjects, this.collideOxygen, undefined, this);

        // add helium to map
        this.heliumObjects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.loadTiledObjects(this.heliumObjects, 'HeliumObj', 'helium')
        this.physics.add.overlap(this.player, this.heliumObjects, this.collideHelium, undefined, this);

        // add exit to map
        this.exitObjects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.loadTiledObjects(this.exitObjects, 'ExitObj', 'exitopenobject')
        this.physics.add.overlap(this.player, this.exitObjects, this.collideExit, undefined, this);

        // add water to map
        this.lavaObjects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.loadTiledObjects(this.lavaObjects, 'LavaObj', 'lavaobject')
        this.physics.add.overlap(this.player, this.lavaObjects, this.collideWater, undefined, this);

        // init walls
        this.initWalls();
    }

    initMusic() {
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

    initPlayer() {
        this.player = new Player(this, startXIndex*70, startYIndex*TILE_WIDTH + 30, 'playerIdle', 10, 1);
        this.setSpriteProperties(this.player, 1.5)
    }

    initEnemy(){
        // x    y
        // 34   4
        // 57   11
        // 67   4
        this.enemies = []
        // this.enemies.push(new Enemy(this, this.map.width * 28, 0, 'enemy', 5, 1, "nacl"));
        this.enemies.push(new Enemy(this, 34 * TILE_WIDTH, 4 * TILE_WIDTH, 'enemy', 5, 1, "nacl"));
        this.enemies.push(new Enemy(this, 57 * TILE_WIDTH, 11 * TILE_WIDTH, 'enemy', 5, 1, "nacl"));
        this.enemies.push(new Enemy(this, 67 * TILE_WIDTH, 4 * TILE_WIDTH, 'enemy', 5, 1, "nacl"));

        this.enemiesGroup = this.physics.add.group({
            immovable: false
        });
        //console.log(this.enemies.length);
        this.enemies.forEach(enemy => {
            this.setSpriteProperties(enemy, .75);
            this.enemiesGroup.add(enemy);
        })
        
        this.physics.add.collider(this.player, this.enemiesGroup, this.collidePlayerEnemy, undefined, this);
        this.physics.add.collider(this.walls, this.enemiesGroup, this.collideWalls, undefined, this)
    }

    initCamera() {
        this.physics.world.setBounds(0, 0, this.map.width * 70, this.map.height * 70);
        this.cameras.main.setBounds(0, 0, this.map.width * 70, this.map.height * 70);
        this.cameras.main.startFollow(this.player);
    }

    initLab() {
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

    initProjectiles() {
        this.projectiles = this.add.group({
            classType: BasicAttack,
            runChildUpdate: true
        });

        this.physics.add.collider(this.projectiles, this.platforms, function (projectile, platform) {
            projectile.destroy();
        });

        this.physics.add.collider(this.projectiles, this.enemiesGroup, this.collideEnemy, undefined, this);
    }
    // -- END INITIALIZE FUNCTIONS --


    // -- START HELPER FUNCTIONS --
    stopMusic() {
        this.bgMusic.stop();
    }

    performAttack() {
        let attack = new BasicAttack(this, this.playerDirection);
    }

    setSpriteProperties(sprite, scale: number, depth?: number) {
        sprite.setBounce(0.1);
        sprite.setCollideWorldBounds(true);
        sprite.setScale(scale);
        this.physics.add.collider(sprite, this.platforms);
        if(depth !== undefined){
            sprite.setDepth(depth);
        }
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
                this.player.setSize(57, 75);
            }
        } else if (this.cursors.right.isDown) {
            this.playerDirection = 1;
            this.player.setVelocityX(runSpeed);
            if (this.player.body.onFloor()) {
                this.player.play('run', true);
                this.player.setSize(57, 75);
            }
        } else {
            this.player.setVelocityX(0);

            if (this.player.body.onFloor()) {
                this.player.play('idle', true);
                this.player.setSize(57, 86);
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
            // this.player.play('idle', true)
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
    // handle collision between enemies and invisible walls
    collideWalls(wall, enemy) {
        enemy.setVelocityX(enemy.getMyXVel()*-1);
        enemy.setMyXVel(enemy.getMyXVel()*-1);

    }

    collideExit() {
        this.stopMusic();
        this.scene.stop('LevelTwoScene');
        this.scene.start('LevelOneScene');
    }

    collideWater() {
        this.gameOver = true;
    }

    collideHint(player) {
        let hintNumber: number = 4;
        for (let i = 0; i < this.hintsXPos.length; i++) {
            if (player.x > this.hintsXPos[i] - player.width && player.x < this.hintsXPos[i] + player.width){
                this.hintsArray[i].setVisible(true);
                this.hintImages[i].setVisible(true);

            }
            else{
                this.hintsArray[i].setVisible(false);
                this.hintImages[i].setVisible(false);
            }
        }
    }

    // elements
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

    collideHelium(player, helium) {
        let item: Element = new Element("Helium", "He", "description text", 2, 2, this.add.image(0, 0, "helium"));
        this.inventory.addItem(this, item);
        this.lab.makeCollision(this, item);

        helium.disableBody(true, true);
    }

    // enemy/player hit each other
    collidePlayerEnemy(player, enemy){
        this.player.play('jump', true);
        console.log(player.health);
        this.player.health -= enemy.damage;
        player.x -= 100;
        // player.setVelocityY(-500);
    }

    // projectile hits enemy
    collideEnemy(projectile,enemy) {
        projectile.destroy();
        console.log(this.player.activeCompound);
        this.enemies.forEach(obj => {
            if(enemy === obj){
                enemy.health -= 1;
                this.floatDmgText(enemy.x-25, enemy.y-100, "-1", 0xffff00, "desyrel" );
                if(enemy.health === 0)
                    enemy.destroy();
            }
        });
    }

    floatDmgText(x, y, message, tint, font) {

        let animation = this.add.bitmapText(x, y, font, message).setTint(tint);
    
        let tween: Phaser.Tweens.Tween = this.add.tween({
          targets: animation, duration: 700, ease: 'Exponential.In', y: y - 50,
    
          onComplete: () => {
            animation.destroy();
          }, callbackScope: this
        });
    
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
        this.initBackground()
        this.initMap();
        this.initPlayer();
        this.initText();
        this.initMusic();
        this.initHints();
        this.initMapObjects();
        this.initCamera();
        this.initLab();
        this.initEnemy();
        this.initProjectiles();

        // start moving enemies
        this.enemies.forEach(element => {
            element.setVelocityX(element.getMyXVel());
        });
    }

    update() {
        //console.log("LEVEL ONE RUNNING")
        if (this.gameOver) {
            this.stopMusic();
            this.player.setCollideWorldBounds(false);
            this.invButton.disableInteractive();

            this.player.setVelocityX(500);
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