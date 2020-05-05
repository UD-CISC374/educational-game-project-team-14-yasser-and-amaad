import { Item } from "./Item";
import { GameObjects, Display } from "phaser";

export class Inventory {
    items: Item[] = [];
    private inventoryDis: GameObjects.Container;
    private tempRect: GameObjects.Rectangle;

    constructor(scene:Phaser.Scene, x:number, y:number){
        // super(scene, x, y);
        this.initializeInv(scene);
    }

    addItem(scene: Phaser.Scene,item:Item): void{
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === item.name){
                this.items[i].amount += 1;
                return;
            }
        }
        this.items.push(item);
        item.image.setScrollFactor(0);
        item.image.setInteractive();
        item.image.setScrollFactor(0);
        scene.input.setDraggable(item.image);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.inventoryDis.add(item.image);

        // console.log("Item added");
        //console.log(this.items.length);

    }

    removeItem(item): void{
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === item.name){
                this.items[i].amount -= 1;
                if(this.items[i].amount <= 0){
                    this.items.splice(i,1);
                }
                return;
            }
        }
    }

    hasItem(item): boolean{
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name === item.name){
                return true;
            }
        }
        return false;
    }

    initializeInv(scene: Phaser.Scene): void{
        this.inventoryDis = scene.add.container(scene.game.canvas.width/3, scene.game.canvas.height/2).setName("pInventory");
        this.tempRect = scene.add.rectangle(0, 0, scene.game.canvas.width/3, scene.game.canvas.height/2, 0xffffff);
        this.inventoryDis.add(this.tempRect);
        this.inventoryDis.setVisible(false);
        // console.log(this.inventoryDis.visible);
        // this.inventoryDis.visible = false;
        this.inventoryDis.setScrollFactor(0);
    }

    refreshRender(): void{
        let xCount: number = 0;
        let yCount: number = 0;
        this.items.forEach(item => { 
            if(xCount % 3 === 0){
                Display.Align.In.TopLeft(item.image, this.tempRect);
                item.image.y += yCount * this.tempRect.height/3;
                //console.log("here1");
            }else if(xCount % 3 === 1){
                Display.Align.In.TopCenter(item.image, this.tempRect);
                item.image.y += yCount * this.tempRect.height/3;
                //console.log("here2");
            }else if(xCount % 3 === 2){
                Display.Align.In.TopRight(item.image, this.tempRect);
                item.image.y += yCount * this.tempRect.height/3;
                yCount++;
                //console.log("here3");
            }

            xCount++;
        });
    }

    setVis(visible: boolean): void{
        this.inventoryDis.setVisible(visible);
        // this.visible = visible;
    }

    getVis():boolean{
        return this.inventoryDis.visible;
    }

    getDisplay(): GameObjects.Container{
        return this.inventoryDis;
    }

    getRect(): GameObjects.Rectangle{
        return this.tempRect;
    }

    getItems(): Item[]{
        return this.items;
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