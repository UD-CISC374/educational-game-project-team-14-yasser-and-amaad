export default class MainScene extends Phaser.Scene {
  private background;
  private map;
  private player;
  private cursors;
  private tileset;
  private text;
  private platforms;
  private spikes;
  private invButton;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.add.text(20, 20, "Loading game...", {color: 'black'});
    this.background = this.add.image(0,0, "background").setOrigin(0,0).setSize(screen.width, screen.height);
    // this.map = this.make.tilemap({key: 'map'});
    this.map = this.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('kenny_simple_platform', 'tiles');
    this.platforms = this.map.createStaticLayer('Platform', this.tileset, 0, screen.height - 400);
    this.platforms.setCollisionByExclusion(-1, true);

    this.player = this.physics.add.sprite(50,300, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'wizard_',
        start: 1,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: [{key: 'player', frame: 'wizard_1'}],
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'wizard_3'}],
      frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.spikes = this.physics.add.group({
    //   allowGravity: false,
    //   immovable: true
    // });

    // const spikeObjects = this.map.getObjectLayer('Spikes')['objects'];

    // spikeObjects.forEach(spikeObject => {
    //   const spike = this.spikes.create(spikeObject.x, spikeObject.y + 200 - spikeObject.height, 'spike').setOrigin(0,0);
    //   spike.body.setSize(spike.width, spike.height -20).setOffset(0,20);
    // });

    // this.physics.add.collider(this.player, this.spikes, this.playerHit, undefined, this);

    // this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
    // this.cameras.main.startFollow(this.player);

    //this.scene.start('MainScene');

    let paused:boolean = false;
    this.invButton = this.add.image(screen.width - 150, screen.height - 100, 'inventory').setScale(0.2);
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

  playerHit(player, spike){
    player.setVelocity(0, 0);
    player.setX(50);
    player.setY(300);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
  }

  update() {
    if(this.cursors.left.isDown){
      this.player.setVelocityX(-200);
      if(this.player.body.onFloor()){
        this.player.play('walk', true);
      }
    }else if (this.cursors.right.isDown){
      this.player.setVelocityX(200);
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
      this.player.setVelocityY(-350);
      this.player.play('jump', true);
    }

    if(this.player.body.velocity.x > 0){
      this.player.setFlipX(false);
    }else if (this.player.body.velocity.x < 0){
      this.player.setFlipX(true);
    }
  }
}
