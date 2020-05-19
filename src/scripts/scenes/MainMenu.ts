import { GameObjects, Display, Physics, Scene } from "phaser"


export default class MainMenu extends Phaser.Scene{
    private playbutton: Phaser.GameObjects.Image;
    private background: Phaser.GameObjects.Sprite;

    constructor(){
        super({ key: 'MainMenu' });
    }
    create(){
        this.background = this.add.sprite(0, 0, 'mainBg').setOrigin(0,0);
        this.background.anims.play('mainBg', true);
        this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);

        this.playbutton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2 + 350, 'mPlay').setAlpha(.5);
        //Display.Align.In.Center(this.playbutton, this.background);
        this.playbutton.setInteractive();
        this.playbutton.on("pointerover",() =>{
            this.playbutton.setAlpha(1);
        });
        this.playbutton.on("pointerout", ()=>{
            this.playbutton.setAlpha(.5);
        });
        this.playbutton.on("pointerup",()=>{
            this.scene.start('LevelOneScene');
        })
    }
}