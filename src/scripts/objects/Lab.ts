import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display } from "phaser"
import { Inventory } from "./Inventory"

export class Lab {
    private pInv: Inventory;
    private tempTable: GameObjects.Rectangle[];
    private result: GameObjects.Rectangle;
    private tempBack: GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, inv: Inventory){
        this.pInv = inv;
        this.tempTable = [];
        this.tempBack = scene.add.rectangle(this.pInv.getRect().width, 0, this.pInv.getRect().width, this.pInv.getRect().height, 0xdeb887,.1);
        this.pInv.getDisplay().add(this.tempBack);

    }

    makeCells(scene: Phaser.Scene):void{
        this.tempTable = [
            scene.add.rectangle(0,0), scene.add.rectangle(128,0),scene.add.rectangle(256,0),
            scene.add.rectangle(0,128), scene.add.rectangle(128,128), scene.add.rectangle(256,128),
            scene.add.rectangle(0,256), scene.add.rectangle(128,256), scene.add.rectangle(256,256)];

            this.tempTable.forEach(cell => {
                this.pInv.getDisplay().add(cell);
        });
    }

    refreshRender(): void{
        let xCount: number = 0;
        let yCount: number = 0;
        this.tempTable.forEach(cell => { 
            if(xCount % 3 === 0){
                Display.Align.In.TopLeft(cell, this.tempBack);
                cell.y += yCount * this.tempBack.height/3;
                //console.log("here1");
            }else if(xCount % 3 === 1){
                Display.Align.In.TopCenter(cell, this.tempBack);
                cell.y += yCount * this.tempBack.height/3;
                //console.log("here2");
            }else if(xCount % 3 === 2){
                Display.Align.In.TopRight(cell, this.tempBack);
                cell.y += yCount * this.tempBack.height/3;
                yCount++;
                //console.log("here3");
            }
        });
    }
}