import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects, Display, Physics } from "phaser"
import { Inventory } from "./Inventory"
import { Item } from "./Item"
import { LabCell } from "./LabCell"
import Player from "./Player"
import { Hotbar } from "./Hotbar"

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
    private hotbar: Hotbar;



    constructor(scene: Phaser.Scene,player:Player, inv: Inventory, hotbar: Hotbar){
        this.scene = scene;
        this.pInv = inv;
        this.hotbar = hotbar;
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
        this.recipeCases();
        
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
            //console.log("craft water!");
            let tempResult = this.scene.add.image(0, 0, 'h2o');
            let tempWater = this.scene.add.image(0, 0, 'h2o');
            this.pInv.getDisplay().add(tempResult);
            Display.Align.In.Center(tempResult, this.resultCell);
            tempResult.setInteractive();
            tempResult.setScrollFactor(0);
            this.resultCell.fillCell("h2o");
            //tempResult.input.draggable = true;
            tempResult.on('pointerup', ()=> {
                this.pInv.addItem(this.scene, new Compound("Water", "H2O", "Water appears as a clear, nontoxic liquid\ncomposed of hydrogen and oxygen,essential for life\nand the most widely used solvent.\n\nGame Use: Increases damage against salt (NaCl) enemies", tempWater));
                console.log(this.pInv.getItems().length);
                this.pInv.refreshRender();
                this.clearCells();
                this.pInv.getDisplay().remove(tempResult);
                this.disableResult(tempResult);
                this.hotbar.makeCollision(this.scene, tempWater);
                this.hotbar.makeMagicColl(this.scene, tempWater);
            });
            this.refreshRender();
        }else if(this.craftTable[1].getFilled() && this.craftTable[2].getFilled() && this.craftTable[3].getFilled() && this.craftTable[4].getFilled() &&
        this.craftTable[1].getElement() === "oxygen" && this.craftTable[2].getElement() === "hydrogen" && this.craftTable[3].getElement() === "hydrogen"&& this.craftTable[4].getElement() === "oxygen"&&
        !this.resultCell.getFilled()){
            let tempResult = this.scene.add.image(0, 0, 'h2o2');
            let tempDeath = this.scene.add.image(0, 0, 'h2o2');
            this.pInv.getDisplay().add(tempResult);
            Display.Align.In.Center(tempResult, this.resultCell);
            tempResult.setInteractive();
            tempResult.setScrollFactor(0);
            this.resultCell.fillCell("h2o2");
            //tempResult.input.draggable = true;
            tempResult.on('pointerup', ()=> {
                this.pInv.addItem(this.scene, new Compound("Hydrogen Peroxide", "H2O2", "Hydrogen Peroxide appears as a very pale\n blue liquid,slightly more viscous than water\nIt is used as an oxidizer, bleaching agent, and antiseptic.\n\nGame Use: Increases damage against salt (NaCl) enemies", tempDeath));
                console.log(this.pInv.getItems().length);
                this.pInv.refreshRender();
                this.clearCells();
                this.pInv.getDisplay().remove(tempResult);
                this.disableResult(tempResult);
                this.hotbar.makeCollision(this.scene, tempDeath);
                this.hotbar.makeMagicColl(this.scene, tempDeath);
            });
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
            //console.log("cleared");
        });
        this.resultCell.emptyCell();
    }
}