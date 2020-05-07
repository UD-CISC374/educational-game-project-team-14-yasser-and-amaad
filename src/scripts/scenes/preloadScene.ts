export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    // background
    this.load.image("background", "assets/map/background.png");
    this.load.image("rocks", "assets/Levels/level_1/rocks.png");

    // map objects
    this.load.image('hint', "assets/Levels/level_1/sign.png");

    // tilesheets
    this.load.image('tiles', "assets/map/platformPack_tilesheet.png");
    this.load.image('T1', "assets/Levels/level_1/tiles_spritesheet.png");  // level_1 tilesheet

    // tiled json maps
    this.load.tilemapTiledJSON('map', "assets/map/map2.json");
    this.load.tilemapTiledJSON('L1', "assets/Levels/level_1/L1.json");  // level 1 json map
    this.load.tilemapTiledJSON('L1_2', "assets/Levels/level_1/L1_2.json");  // level 1 json map
    this.load.tilemapTiledJSON('Level_1', "assets/Levels/level_1/Level_1.json");  // level 1 json map
    this.load.tilemapTiledJSON('Level_2', "assets/Levels/level_2/Level_2.json");  // level 2 json map


    // elements
    this.load.image('hydrogen', "assets/elements/hydrogen.png");
    this.load.image('oxygen', "assets/elements/oxygen.png");

    // temp elements
    this.load.image('hydrogenTemp', "assets/elements/hydrogen_temp.png");
    this.load.image('oxygenTemp', "assets/elements/oxygen_temp.png");

    // other objects
    this.load.image('exitobject', "assets/Levels/level_1/exitobject.png");
    this.load.image('waterobject', "assets/Levels/level_1/waterobject.png");
    this.load.image('exitopenobject', "assets/Levels/level_2/exitopenobject.png");
    this.load.image('lavaobject', "assets/Levels/level_2/lavaobject.png");

    //compounds
    this.load.image('h2o', "assets/elements/h2o.png");


    // character/animation sprites
    this.load.image('inventoryButton', "assets/map/book.png");

    this.load.atlas('playerRun', 'assets/character/animations/Run.png', 'assets/character/animations/run.json');
    this.load.atlas('playerIdle', 'assets/character/animations/Idle.png', 'assets/character/animations/idle.json');
    this.load.atlas('playerJump', 'assets/character/animations/Jump.png', 'assets/character/animations/jump.json');
    this.load.atlas('playerFall', 'assets/character/animations/Fall.png', 'assets/character/animations/fall.json');
    this.load.atlas('playerAtk1', 'assets/character/animations/Attack1/atk1.png', 'assets/character/animations/Attack1/atk1.json');
    this.load.atlas('playerHit', 'src/assets/character/animations/Hit.png', 'assets/character/animations/hit.json');

    // attacks
    this.load.spritesheet("basic_attack", "assets/character/attacks/beam.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    //enemies
    this.load.image('boss', "src/assets/map/nacl_monster.png")
    this.load.image('enemy', "src/assets/map/enemy_1.png")
    
    // audio
    this.load.audio("bg_netherplace", "assets/audio/bg_netherplace.mp3");
  }

  create() {
    this.createPlayerAnims();
    this.createAttackAnims()
    this.scene.start('LevelOneScene');
  }

  createPlayerAnims(){
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('playerRun', {
        prefix: 'run',
        start: 1,
        end: 8,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('playerIdle', {
        prefix: 'idle',
        start: 1,
        end: 6,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNames('playerJump', {
        prefix: 'jump',
        start: 1,
        end: 2,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNames('playerFall', {
        prefix: 'fall',
        start: 1,
        end: 2,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'attack1',
      frames: this.anims.generateFrameNames('playerAtk1', {
        prefix: 'attack',
        start: 0,
        end: 7,
        suffix: '.png'
      }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'hit',
      frames: this.anims.generateFrameNames('playerHit', {
        prefix: "hit",
        start: 0,
        end: 3,
        suffix: '.png'
      }),
      frameRate: 4
    });
  }

  createAttackAnims() {
    this.anims.create({
      key: "basic_attack_anim",
      frames: this.anims.generateFrameNumbers('basic_attack', {}),
      frameRate: 20,
      repeat: -1
    });

  }
}
