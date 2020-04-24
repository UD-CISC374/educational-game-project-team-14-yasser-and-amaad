import { GameObjects } from 'phaser';
import { Display} from 'phaser';

export default class labScene extends Phaser.Scene {
    private invButton: Phaser.GameObjects.Image;
    private labRect: Phaser.GameObjects.Shape;
    private slot: Phaser.GameObjects.Shape;
    // private elements: Array<Elements>;
    // private compounds: Array<Compounds>;
    //private recipes: Array<[number, number, number]>;
    private oxy: GameObjects.Image;
    private hydro: GameObjects.Image;

    constructor() {
        super({ key: 'labScene' });
    }


    create(){
        this.labRect = this.add.rectangle(this.game.canvas.width/2, this.game.canvas.height/2, this.game.canvas.width/2, this.game.canvas.height/2, 0xf5deb3, 1);
        console.log(this.game.canvas.width + " " + this.game.canvas.height);
        let widthOff: number = this.labRect.width/8;//offset of width between the lab table and screen
        let heightOff: number = this.labRect.height/8;//offset of height between the lab table and screen
        let rectOffX: number = this.labRect.width/2  ;
        let rectOffY: number = this.labRect.height/2  ;
        let boxOffX: number = this.labRect.width/8;
        let boxOffY: number = this.labRect.height/8;

        /**
         * 
         * 0 0 1 2
         * 0 0 3 4
         * 
         * 
         * 
         * 
         *  */



        //let grid:Phaser.GameObjects.Grid = this.add.grid(screen.width/2, screen.height/2,screen.width/2, screen.height/2, screen.width/8, screen.height/8, 0x000000, 0, 0x000000, 1).setDepth(5);

        this.hydro = this.add.image((screen.width/2 + boxOffX * 1), (screen.height/2 - rectOffY + boxOffY * 1), 'hydrogen').setDepth(4); // item # 1 lmao
        this.oxy = this.add.image((screen.width/2 + boxOffX * 3), (screen.height/2 - rectOffY + boxOffY * 1), 'oxygen').setDepth(4);       // ITEM 2
        this.hydro.setInteractive();
        this.oxy.setInteractive();
        this.input.setDraggable(this.hydro);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        
        this.invButton = this.add.image(80, 80, 'inventory').setScale(0.2).setDepth(5);
        this.invButton.setInteractive();
        let cir: Phaser.GameObjects.Shape = this.add.circle(80, 80, 64, 0xffff00, 1).setDepth(4); //yello circle behind book
        cir.alpha = 0;
        this.invButton.on("pointerover", ()=> {
            console.log("leave?");
            cir.alpha = 1;
        });
        
        this.invButton.on("pointerout", ()=>{
            console.log("nah2");
            cir.alpha = 0;
        });
        
        this.invButton.on("pointerup", ()=>{
            console.log("back to business");
            this.scene.resume('MainScene');
            this.scene.stop();
        });
    }




}