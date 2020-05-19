import { GameObjects, Display, Physics, Scene } from "phaser"


export default class MainMenu extends Phaser.Scene{
    private playbutton: Phaser.GameObjects.Image;
    private background: Phaser.GameObjects.Sprite;

    constructor(){
        super({ key: 'MainMenu' });
    }
    create(){
        this.background = this.add.sprite(0, 0, 'mainBg');
        this.background.anims.play('mainBg', true);

        // this.playbutton = this.add.image(0, 0, 'mPlay').setAlpha(.5);
        // this.playbutton.setInteractive();
        // this.playbutton.on("pointerover",() =>{
        //     this.playbutton.setAlpha(1);
        // });
        // this.playbutton.on("pointerout", ()=>{
        //     this.playbutton.setAlpha(.5);
        // });
        // this.playbutton.on("pointerup",()=>{
        //     this.scene.start('LevelOneScene');
        // })
    }
}