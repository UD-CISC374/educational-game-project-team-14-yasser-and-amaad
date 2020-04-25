export default class MainScene extends Phaser.Scene {
  private background;
  private map;
  private player;
  private cursors;
  private tileset;
  private text;
  private platforms;
  private hints;
  private invButton;

  runSprite;
  hintsArray : Array<Phaser.GameObjects.Text>;
  hintsXPos : Array<number>;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.hintsArray = [];
    this.hintsXPos = [];
    this.background = this.add.image(0,0, "background").setOrigin(0,0).setSize(screen.width, screen.height);
    // this.map = this.make.tilemap({key: 'map'});
    this.map = this.add.tilemap('L1');
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'T1');
    this.platforms = this.map.createStaticLayer('Water', this.tileset, 0, 30);
    this.platforms = this.map.createStaticLayer('Ground', this.tileset, 0, 30);
    this.platforms.setCollisionByExclusion(-1, true);

<<<<<<< Updated upstream
    this.player = this.physics.add.sprite(10,this.game.canvas.height - this.game.canvas.height/4, 'player');
=======
    this.player = this.physics.add.sprite(10,this.game.canvas.height - (this.game.canvas.height/4), 'playerRun');
>>>>>>> Stashed changes
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.player.setDepth(999)

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('playerRun', {
        prefix: 'run',
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1
    });

    // this.anims.create({
    //   key: 'walk',
    //   frames: this.anims.generateFrameNames('player', {
    //     prefix: 'wizard_',
    //     start: 1,
    //     end: 5,
    //   }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    this.anims.create({
      key: 'idle',
      frames: [{key: 'playerRun', frame: 'run1'}],
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'playerRun', frame: 'run3'}],
      frameRate: 10,
    });

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
        this.player.play('walk', true);
      }
    }else if (this.cursors.right.isDown){
      this.player.setVelocityX(300);
      if(this.player.body.onFloor()){
        this.player.play('walk', true);
      }
    }else {
      this.player.setVelocityX(0);

      if(this.player.body.onFloor()){
        this.player.play('idle', true);
      }
    }

    if((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){
      this.player.setVelocityY(-1000);
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
}
