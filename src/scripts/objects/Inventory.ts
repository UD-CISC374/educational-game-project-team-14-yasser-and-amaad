import { Item } from "./Item";
import { Game } from "phaser";

export class Inventory extends Phaser.GameObjects.Container{
    private items: Array<Item>;

    addItem(name, amount){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === name){
                this.items[i].amount += amount;
                return;
            }
        }
        //this.items.push({name , amount});
    }

    removeItem(name, amount){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === name){
                this.items[i].amount -= amount;
                if(this.items[i].amount <= 0){
                    this.items.splice(i,1);
                }
                return;
            }
        }
    }

    hasItem(name, amount){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === name){
                return this.items[i].amount >= amount;
            }
        }
        return false;
    }

    refreshRender(){

    }
    // row: number;
    // col:number;
    // color;
    // children: [];
    // cellW: number;
    // cellH: number;

    // constructor(scene: Phaser.Scene, x:number, y:number,cellW: number, cellH: number,row: number, col:number, children: []){
    //     super(scene, x, y, children);
    //     this.row = row;
    //     this.col = col;
    //     this.color = '#ffffff';
    //     this.children = children;
    //     this.cellW = cellW;
    //     this.cellH = cellH;
    // }

    // createCont(scene){
    //     scene.add.container(scene.game.canvas.width/2, scene.game.canvas.height/2);
    //     this.setSize(scene.game.canvas.width/2, scene.game.canvas.height/2);
    //     let tempr: number = this.row;
    //     let tempc: number = this.col;
    //     this.children.forEach(element => {
    //         scene.add.rectangle(this.row - tempr, this.col - tempc, this.cellW, this.cellH, this.color);
    //         tempr--;
    //         tempc--;
    //     });
    // }
    

}