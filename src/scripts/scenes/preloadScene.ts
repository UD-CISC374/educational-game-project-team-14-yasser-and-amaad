export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    // background
    this.load.image("background", "assets/map/background.png");
    this.load.image("rocks", "assets/level_1/rocks.png");

    // map objects
    this.load.image('spike', "assets/map/spike.png");
    this.load.image('hint', "assets/level_1/sign.png");

    // tilesheets
    this.load.image('tiles', "assets/map/platformPack_tilesheet.png");
    this.load.image('T1', "assets/level_1/tiles_spritesheet.png");  // level_1 tilesheet

    // tiled json maps
    this.load.tilemapTiledJSON('map', "assets/map/map2.json");
    this.load.tilemapTiledJSON('L1', "assets/level_1/L1.json");  // level 1 json map


    // elements
    this.load.image('hydrogen', "assets/map/hydrogen.png");
    this.load.image('oxygen', "assets/map/oxygen.png");


    // characters
    this.load.atlas('player', 'assets/map/wizard walk.png', 'assets/map/wizard walk.json');
    this.load.image('inventory', "assets/map/book.png");

    this.load.atlas('playerRun', 'assets/character/Run.png', 'assets/character/run.json');
    this.load.atlas('playerIdle', 'assets/character/Idle.png', 'assets/character/idle.json');
    this.load.atlas('playerJump', 'assets/character/Jump.png', 'assets/character/jump.json');
  }

  create() {
    this.scene.start('MainScene');
  }
}
