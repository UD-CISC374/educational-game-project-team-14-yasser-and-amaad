export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "src/assets/tmp/background.png");
    this.load.image('spike', "src/assets/tmp/spike.png");
    this.load.image('tiles', "src/assets/tmp/platformPack_tilesheet.png")
    this.load.tilemapTiledJSON('map', "src/assets/tmp/map2.json");
    this.load.atlas('player', 'src/assets/tmp/wizard walk.png', 'src/assets/tmp/wizard walk.json');
    this.load.image('inventory', "src/assets/tmp/book.png");
    
    this.load.image('hydrogen', "src/assets/tmp/hydrogen.png");
    this.load.image('oxygen', "src/assets/tmp/oxygen.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
