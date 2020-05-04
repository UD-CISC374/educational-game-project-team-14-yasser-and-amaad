import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"
import { GameObjects } from "phaser"
import { Inventory } from "./Inventory"

export class Lab {
    private pInv: Inventory;
    private tempTable: GameObjects.Rectangle[][];
    private result: GameObjects.Rectangle;
    private tempBack: GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, inv: Inventory){
        this.pInv = inv;
        this.tempBack = scene.add.rectangle(this.pInv.getRect().width, 0, this.pInv.getRect().width, this.pInv.getRect().height, 0xdeb887, 1);
        this.tempTable = [
            [scene.add.rectangle(0,0), scene.add.rectangle(128,0),scene.add.rectangle(256,0)],
            [scene.add.rectangle(0,128), scene.add.rectangle(128,128), scene.add.rectangle(256,128)],
            [scene.add.rectangle(0,256), scene.add.rectangle(128,256), scene.add.rectangle(256,256)]
        ];
    }
}