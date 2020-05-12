import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"
import { LabCell } from "./LabCell"
import Player from "./Player"

export class Lab {
    private pInv: Inventory;
    private craftTable: LabCell[];
    private resultCell: LabCell;
    //private tempResult: GameObjects.Image;
    private tempBack: GameObjects.Rectangle;
    private itemGroup;
    private cellGroup;
    private scene: Phaser.Scene;
    private player: Player;



    constructor(scene: Phaser.Scene,player:Player, inv: Inventory){
        this.scene = scene;
        this.pInv = inv;
        this.craftTable = [];
        this.tempBack = scene.add.rectangle(this.pInv.getRect().width, 0, this.pInv.getRect().width, this.pInv.getRect().height, 0xdeb887);
        this.tempBack.setScrollFactor(0);
        this.pInv.getDisplay().add(this.tempBack);
        this.resultCell = new LabCell(scene, 99);
        this.itemGroup = scene.physics.add.group({allowGravity: false});
        this.cellGroup = scene.physics.add.group({allowGravity: false});
        this.player = player;
    }

    makeCells(scene: Phaser.Scene):void{
        for(let i: number = 0; i < 6; i++){
            this.craftTable.push(new LabCell(scene, i));
        }
            this.craftTable.forEach(cell => {
                cell.setInteractive();
                cell.setScrollFactor(0);
                cell.on("pointerover", () =>{
                    cell.setStrokeStyle(4, 0xffffff);
                });

                cell.on("pointerout", () => {
                    cell.setStrokeStyle(0);
                });
                this.pInv.getDisplay().add(cell);
                this.cellGroup.add(cell);

        });
        this.pInv.getDisplay().add(this.resultCell);
        this.refreshRender();

        this.craftTable.forEach(cell =>{
            cell.setPos(cell.x, cell.y);
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

        Display.Align.In.BottomCenter(this.resultCell, this.tempBack);
        // Display.Align.In.Center(new Text("Result"), this.resultCell.getRect());
    }

    interactCell = (element ,rect) =>{
        Display.Align.In.Center(element, rect);
        rect.fillCell(element.name.toLowerCase())
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
        this.endFunc();
        
    }
    endFunc = () => {
    // console.log(this.craftTable[1].getFilled() + "|" +
    // this.craftTable[3].getFilled() + "|" +
    // this.craftTable[5].getFilled() + "|" +
    // this.craftTable[1].getElement() + "|" +
    // this.craftTable[3].getElement() + "|" +
    // this.craftTable[5].getElement() + "|");
    this.recipeCases();
    // console.log("after loop")
  }

    recipeCases(){
        if(this.craftTable[1].getFilled() && this.craftTable[3].getFilled() && this.craftTable[5].getFilled() &&
        this.craftTable[1].getElement() === "oxygen" && this.craftTable[3].getElement() === "hydrogen" && this.craftTable[5].getElement() === "hydrogen"&&
        !this.resultCell.getFilled()){
            console.log("craft water!");
            let tempResult = this.scene.add.image(0, 0, 'h2o');
            this.pInv.getDisplay().add(tempResult);
            Display.Align.In.Center(tempResult, this.resultCell);
            tempResult.setInteractive();
            tempResult.setScrollFactor(0);
            this.resultCell.fillCell("h2o");
            //tempResult.input.draggable = true;
            tempResult.on('pointerup', ()=> {
                this.pInv.addItem(this.scene, new Compound("water", "h20", "water compound", this.scene.add.image(0, 0, 'h2o')));
                console.log(this.pInv.getItems().length);
                this.pInv.refreshRender();
                this.clearCells();
                this.player.activeCompound = "h2o";
                this.pInv.getDisplay().remove(tempResult);
                this.disableResult(tempResult);
            });
            this.refreshRender();
        }
    }

    disableResult(tempResult){
        tempResult.disableInteractive();
        tempResult.setVisible(false);
        console.log("disabled");
    }

    clearCells(){
        this.craftTable.forEach(cell =>{
            cell.emptyCell();
            console.log("cleared");
        });
        this.resultCell.emptyCell();
    }
}