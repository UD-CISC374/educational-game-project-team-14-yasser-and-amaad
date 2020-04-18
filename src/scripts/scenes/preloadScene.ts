export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "src/assets/map/background.png");
    this.load.image('spike', "src/assets/map/spike.png");
    this.load.image('tiles', "src/assets/map/platformPack_tilesheet.png")
    this.load.tilemapTiledJSON('map', "src/assets/map/map2.json");
    this.load.atlas('player', 'src/assets/map/wizard walk.png', 'src/assets/map/wizard walk.json');
    this.load.image('inventory', "src/assets/map/book.png");

    this.load.image('hydrogen', "src/assets/map/hydrogen.png");
    this.load.image('oxygen', "src/assets/map/oxygen.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
