import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"
import { LabCell } from "./LabCell"

export class Lab {
    private pInv: Inventory;
    private craftTable: LabCell[];
    private resultCell: LabCell;
    private tempBack: GameObjects.Rectangle;
    private itemGroup;
    private cellGroup;



    constructor(scene: Phaser.Scene, inv: Inventory){
        this.pInv = inv;
        this.craftTable = [];
        this.tempBack = scene.add.rectangle(this.pInv.getRect().width, 0, this.pInv.getRect().width, this.pInv.getRect().height, 0xdeb887);
        this.tempBack.setScrollFactor(0);
        this.pInv.getDisplay().add(this.tempBack);
        this.resultCell = new LabCell(scene, 99);
        this.itemGroup = scene.physics.add.group({allowGravity: false});
        this.cellGroup = scene.physics.add.group({allowGravity: false});
    }

    makeCells(scene: Phaser.Scene):void{
        for(let i: number = 0; i < 6; i++){
            this.craftTable.push(new LabCell(scene, i));
        }
            this.craftTable.forEach(cell => {
                cell.getRect().setInteractive();
                cell.getRect().setScrollFactor(0);
                cell.getRect().on("pointerover", () =>{
                    cell.getRect().setStrokeStyle(4, 0xffffff);
                });

                cell.getRect().on("pointerout", () => {
                    cell.getRect().setStrokeStyle(0);
                });
                this.pInv.getDisplay().add(cell.getRect());
                this.cellGroup.add(cell.getRect());

        });
        this.pInv.getDisplay().add(this.resultCell.getRect());
        this.refreshRender();

        this.craftTable.forEach(cell =>{
            cell.setPos(cell.getRect().x, cell.getRect().y);
        });
    }

    makeCollision(scene: Phaser.Scene,item: Item){
        this.itemGroup.add(item.image);
                scene.physics.add.collider(this.itemGroup, this.cellGroup, this.interactCell);
    }

    refreshRender(): void{
        let xCount: number = 0;
        let yCount: number = 0;
        this.craftTable.forEach(cell => { 
            if(xCount % 3 === 0){
                Display.Align.In.TopLeft(cell.getRect(), this.tempBack);
                cell.getRect().y += yCount * this.tempBack.height/3;
                //console.log("here1");
            }else if(xCount % 3 === 1){
                Display.Align.In.TopCenter(cell.getRect(), this.tempBack);
                cell.getRect().y += yCount * this.tempBack.height/3;
                //console.log("here2");
            }else if(xCount % 3 === 2){
                Display.Align.In.TopRight(cell.getRect(), this.tempBack);
                cell.getRect().y += yCount * this.tempBack.height/3;
                yCount++;
                //console.log("here3");
            }
            xCount++;
        });

        Display.Align.In.BottomCenter(this.resultCell.getRect(), this.tempBack);
        // Display.Align.In.Center(new Text("Result"), this.resultCell.getRect());
    }

    interactCell(element ,rect){
        Display.Align.In.Center(element, rect);
        // endFunc(element, rect);
        // console.log("before loop")
        // this.craftTable.forEach(cell => {
        //     console.log("before if")
        //     if([cell.getPos() === [rect.x, rect.y]]){
        //         console.log("if");
        //         cell.fillCell(element)
        //     }
        //     console.log("after if")
        // })
        // console.log("after loop")
        
    }
    readonly endFunc = (element, rect) => {
        console.log("before loop")
    this.craftTable.forEach(cell => {
        console.log("before if")
        if([cell.getPos() === [rect.x, rect.y]]){
            console.log("if");
            cell.fillCell(element)
        }
        console.log("after if")
    })
    console.log("after loop")
  }

    recipeCases(){
        if(this.craftTable[2].isFilled() && this.craftTable[4].isFilled() && this.craftTable[6].isFilled() &&
        this.craftTable[2].getElement() === "oxygen" && this.craftTable[4].getElement() === "hydrogen" && this.craftTable[6].getElement() === "hydrogen"){
            console.log("craft water!");
        }
    }
}