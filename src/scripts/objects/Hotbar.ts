import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display, Physics, Game } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"
import { LabCell } from "./LabCell"
import Player from "./Player"
import { Lab } from "./Lab"

export class Hotbar{
    slots: any[];
    magicBall: GameObjects.Ellipse;
    mBallItems;
    mBallGroup;
    slotGroup;
    itemGroup;
    pInv: Inventory;
    tempBack: GameObjects.Rectangle;
    player: Player;
    scene: Phaser.Scene;
    hotbarView: GameObjects.Container;
    //slot1: LabCell;
    //slot2: LabCell;
    //ball: GameObjects.Ellipse;

    constructor(scene: Phaser.Scene, player: Player, pInv: Inventory){
        this.scene = scene;
        this.player = player;
        this.pInv = pInv;
        this.slots = [];
        this.magicBall = scene.add.ellipse(0, 0, 128, 128, 0xffffff);
        this.magicBall.setInteractive();
        this.magicBall.setScrollFactor(0);
        this.mBallGroup = scene.physics.add.group({allowGravity: false});
        this.mBallItems = scene.physics.add.group({allowGravity:false});
        this.slotGroup = scene.physics.add.group({allowGravity: false});
        this.itemGroup = scene.physics.add.group({allowGravity: false});
        this.mBallGroup.add(this.magicBall);
        this.tempBack = scene.add.rectangle(0, this.pInv.getRect().height/2, this.pInv.getRect().width,this.pInv.getRect().height/4, 0xdeb887);
        this.tempBack.y += this.tempBack.height/2; 
        this.tempBack.setScrollFactor(0);
        this.pInv.getDisplay().add(this.tempBack);
        this.makeSlots();
        this.hotbarView = scene.add.container(0, 0);
        //this.createView();
    }

    makeSlots(){
        for(let i = 0; i < 2; i++){
            this.slots.push(new LabCell(this.scene, i));
        }

        this.magicBall.on("pointerover", () =>{
            this.magicBall.setStrokeStyle(4, 0x808080);
        });
        this.magicBall.on("pointerout", ()=>{
            this.magicBall.setStrokeStyle(0);
        });

        this.slots.forEach(slot => {
            slot.setInteractive();
            slot.setScrollFactor(0);
            slot.on("pointerover", ()=> {
                slot.setStrokeStyle(4, 0xffffff);
            });

            slot.on("pointerout", () => {
                slot.setStrokeStyle(0);
            });

            this.pInv.getDisplay().add(slot);
            this.slotGroup.add(slot);
        });
        this.pInv.getDisplay().add(this.magicBall);
        this.slots.push(this.magicBall);

        this.refreshRender();
    }

    refreshRender(): void{
        let xCount: number = 0;
        this.slots.forEach(slot => { 
            if(xCount % 3 === 0){
                Display.Align.In.LeftCenter(slot, this.tempBack);
            }else if(xCount % 3 === 1){
                Display.Align.In.Center(slot, this.tempBack);
            }else if(xCount % 3 === 2){
                Display.Align.In.RightCenter(slot, this.tempBack);
            }
            xCount++;
        });

        this.pInv.items.forEach(item =>{
            //console.log("madeColl");
            this.makeMagicColl(this.scene, item.image);
        });
    }

    makeCollision(scene: Phaser.Scene,image: GameObjects.Image){
        this.itemGroup.add(image);
        scene.physics.add.collider(this.itemGroup, this.slotGroup, this.interactSlot);
    }

    makeMagicColl(scene: Phaser.Scene, image: GameObjects.Image){
        this.mBallItems.add(image);
        scene.physics.add.collider(this.mBallItems, this.mBallGroup, this.interactBall);
    }

    interactSlot = (image, rect) => {
        Display.Align.In.Center(image, rect);
        rect.fillCell(image.name.toLowerCase());
        // if(rect == this.slots.indexOf(0)){
        //     Display.Align.In.Center(image, this.slot1);
        // }else{
        //     Display.Align.In.Center(image, this.slot2);
        // }

    }

    interactBall = (image, ball) => {
        Display.Align.In.Center(image, ball);
        this.player.magicBall = image.name;
        //console.log(this.player.magicBall);
        // console.log(this.player.magicBall);
    }

    // createView(){
    //     console.log("start view");
    //     this.slot1 = new LabCell(this.scene, 0);
    //     this.slot2 = new LabCell(this.scene, 0);
    //     this.ball = this.scene.add.ellipse(0, 0, 128, 128, 0xffffff, 1);
    //     this.slot1.setScrollFactor(0);
    //     this.slot2.setScrollFactor(0);
    //     this.ball.setScrollFactor(0);
    //     this.slot1.alpha = 1;
    //     this.slot2.alpha = 1;
    //     //this.hotbarView.add([this.slot1, this.slot2]);
    //     //this.hotbarView.add(this.ball);
    //     console.log(this.scene.game.canvas.width +" " +this.scene.game.canvas.height);
    //     this.slot1.x = this.scene.game.canvas.width/2;
    //     console.log(this.slot1.x)
    //     this.slot1.y = this.scene.game.canvas.height/2 - 80;
        
    //     this.slot2.x = this.slot1.x + this.slot1.width;
    //     this.slot2.y = this.slot1.y;

    //     this.ball.x = this.scene.game.canvas.width - 80;
    //     this.ball.y = this.scene.game.canvas.height - 80;
    // }
}