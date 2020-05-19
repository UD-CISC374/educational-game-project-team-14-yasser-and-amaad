import { Item } from "./Item";
import { GameObjects, Display } from "phaser";
import { Compound } from "./Compound";

export class Inventory {
    items: Item[] = [];
    private inventoryDis: GameObjects.Container;
    private tempRect: GameObjects.Rectangle;
    private infoBox: GameObjects.Rectangle;
    private tempText;

    constructor(scene:Phaser.Scene, x:number, y:number){
        // super(scene, x, y);
        this.initializeInv(scene);
    }

    addItem(scene: Phaser.Scene,item:Item): void{
        // for(var i = 0; i < this.items.length; i++){
        //     if(this.items[i].name === item.name){
        //         this.items[i].amount += 1;
        //         return;
        //     }
        // }
        this.items.push(item);
        item.image.setScrollFactor(0);
        item.image.setInteractive();
        item.image.setScrollFactor(0);
        scene.input.setDraggable(item.image);
        item.image.on("pointerover", () =>{
            this.infoBox.setVisible(true);
            this.addText(scene, item);
        });

        item.image.on("pointerout", () => {
            this.infoBox.setVisible(false);
            this.destroyText();
        });
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.inventoryDis.add(item.image);

        // play sound
        scene.sound.play("sfx_pickupItem");

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
        this.tempRect.setStrokeStyle(1);
        
        this.infoBox = scene.add.rectangle(scene.game.canvas.width/4 - 140, -(scene.game.canvas.height - (scene.game.canvas.height/2))/2 - 135, scene.game.canvas.width/3, scene.game.canvas.height/4 - 20, 0x000000, .05);
        this.infoBox.setStrokeStyle(2);
        this.infoBox.setVisible(false);
        
        this.inventoryDis.add(this.tempRect);
        this.inventoryDis.add(this.infoBox);
        this.inventoryDis.setVisible(false);

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

    addText(scene: Phaser.Scene,item:Item) {
        this.tempText = scene.add.text(scene.game.canvas.width/3 + 30, 15, item.toString());
        this.tempText.setStyle({
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#000000',
            thickness: 5,
            align: 'left'
        });
        this.tempText.setScrollFactor(0);
    }

    destroyText() {
        this.tempText.destroy();
    }


}