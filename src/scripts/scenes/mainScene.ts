
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

  // game config
  gameWidth : number;
  gameHeight : number;

  // player stuff
  private player;

  hintsArray : Array<Phaser.GameObjects.Text>;
  hintsXPos : Array<number>;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // onLoad
    this.gameWidth = this.game.canvas.width;
    this.gameHeight = this.game.canvas.height;
    this.hintsArray = [];
    this.hintsXPos = [];

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
    this.setSpriteProperties(this.player)


    // animation handler
    this.handleAnimations();

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

      this.hintsArray.push(this.add.text(hintObject.x - 50, hintObject.y - 150, "HINT " + counter + " PLEASE WORK", {color: 'BLACK'}).setVisible(true));
      this.hintsXPos.push(hintObject.x);
      counter++;
    });

    this.physics.add.overlap(this.hints, this.player, this.playerHit, undefined, this);

    this.physics.world.setBounds(0,0,7000, 1080);
    this.cameras.main.setBounds(0, 0, 7000, 1080);
    this.cameras.main.startFollow(this.player);
    //this.scene.start('MainScene');

    let paused:boolean = false;
    this.invButton = this.add.image(80, 80, 'inventory').setScale(0.2);
    this.invButton.setScrollFactor(0);
    this.invButton.alpha = .5;
    this.invButton.setInteractive();
    this.invButton.on("pointerover",()=>{
      console.log("hover");
      this.invButton.alpha = 1;
    });

    this.invButton.on("pointerout",()=>{
      console.log("nah");
      this.invButton.alpha = .5;
    });

    this.invButton.on("pointerup", ()=>{
      console.log("pause?");
      this.scene.pause();
      this.scene.launch('labScene');
    });

    //let cir: Phaser.GameObjects.Shape = this.add.circle(screen.width - 150, screen.height - 100, 128, 0xffff00, 1).setDepth(4);
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

    if((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){
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
    sprite.setDepth(999)
  }

  handleAnimations(){
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('playerRun', {
        prefix: 'run',
        start: 1,
        end: 8,
      }),
      frameRate: 15,
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
  }

}
