export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/map/background.png");
    this.load.image('spike', "sassets/map/spike.png");
    this.load.image('tiles', "assets/map/platformPack_tilesheet.png")
    this.load.tilemapTiledJSON('map', "assets/map/map2.json");
    this.load.atlas('player', 'assets/map/wizard walk.png', 'assets/map/wizard walk.json');
    this.load.image('inventory', "assets/map/book.png");

    this.load.image('hydrogen', "assets/map/hydrogen.png");
    this.load.image('oxygen', "assets/map/oxygen.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}