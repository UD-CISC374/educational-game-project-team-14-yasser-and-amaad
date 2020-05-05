import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"

export class Lab {
    private pInv: Inventory;
    private tempTable: GameObjects.Rectangle[];
    private tempFill: boolean[]
    private result: GameObjects.Rectangle;
    private tempBack: GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, inv: Inventory){
        this.pInv = inv;
        this.tempTable = [];
        this.tempBack = scene.add.rectangle(this.pInv.getRect().width, 0, this.pInv.getRect().width, this.pInv.getRect().height, 0xdeb887);
        this.tempBack.setScrollFactor(0);
        this.pInv.getDisplay().add(this.tempBack);
    }

    makeCells(scene: Phaser.Scene):void{
        this.tempTable = [
            scene.add.rectangle(0,0,128,128,0x808080, 1), scene.add.rectangle(128,0,128,128,0x808080,1), scene.add.rectangle(256,0,128,128,0x808080,1),
            scene.add.rectangle(0,128,128,128,0x808080,1), scene.add.rectangle(128,128,128,128,0x808080,1), scene.add.rectangle(256,128,128,128,0x808080,1),
            scene.add.rectangle(0,256,128,128,0x808080,1), scene.add.rectangle(128,256,128,128,0x808080,1), scene.add.rectangle(256,256,128,128,0x808080,1)];

            this.tempTable.forEach(cell => {
                cell.setInteractive();
                cell.setScrollFactor(0);
                cell.on("pointerover", () =>{
                    //console.log("over the crafting table");
                    cell.setStrokeStyle(4, 0xffffff);
                });

                cell.on("pointerout", () => {
                    //console.log("out of the crafting table");
                    cell.setStrokeStyle(0);
                });
                // console.log("before loop");
                // console.log(this.pInv.items.length);
                // console.log("after loop");
                // scene.input.setDraggable(cell);
                // scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                //     gameObject.x = dragX;
                //     gameObject.y = dragY;
                // });
                this.pInv.getDisplay().add(cell);
        });
        
        
        this.refreshRender();
    }

    makeCollision(scene: Phaser.Scene,item: Item){
        this.tempTable.forEach(cell => {
                console.log("in loop");
                scene.physics.add.collider(item.image, cell,this.interactCell,undefined, scene);
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
            xCount++;
        });
    }

    interactCell(element ,image){
        console.log("element collides with da craft");
        Display.Align.In.Center(element, image);
    }
}