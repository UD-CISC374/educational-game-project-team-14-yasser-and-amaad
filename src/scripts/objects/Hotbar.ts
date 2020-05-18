import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"
import { LabCell } from "./LabCell"
import Player from "./Player"
import { Lab } from "./Lab"

export class Hotbar{
    private slots: LabCell[];
    private slotGroup;
    private itemGroup;
    private pInv: Inventory;
    private tempBack: GameObjects.Rectangle;
    private player: Player;
    private scene: Phaser.Scene;
    private lab: Lab;

    constructor(scene: Phaser.Scene, player: Player, pInv: Inventory, lab: Lab){
        this.scene = scene;
        this.player = player;
        this.pInv = pInv;
        this.lab = lab;
        this.slots = [];
        this.slotGroup = scene.physics.add.group({allowGravity: false});
        this.itemGroup = scene.physics.add.group({allowGravity: false});
        this.tempBack = scene.add.rectangle(0, this.pInv.getRect().height/2, this.pInv.getRect().width,this.pInv.getRect().height/4, 0xdeb887);
        this.tempBack.y += this.tempBack.height/2; 
        this.tempBack.setScrollFactor(0);
        this.pInv.getDisplay().add(this.tempBack);
        this.makeSlots();

    }

    makeSlots(){
        for(let i = 0; i < 3; i++){
            this.slots.push(new LabCell(this.scene, i));
        }

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
    }

    makeCollision(scene: Phaser.Scene,item: Item){
        this.itemGroup.add(item.image);
                scene.physics.add.collider(this.itemGroup, this.slotGroup, this.interactSlot);
    }

    interactSlot = (item, rect) => {
        Display.Align.In.Center(item, rect);
        rect.fillCell(item.name.toLowerCase());
    }
}