import { Item } from "./Item";
import { GameObjects } from "phaser";

export class LabCell extends GameObjects.Rectangle{
    private filled: boolean;
    private index: number;
    private position?: [number, number];
    //private rect: GameObjects.Rectangle;
    private element?: string;

    constructor(scene:Phaser.Scene, index:number){
        super(scene, 0, 0, 128, 128, 0x808080, 1);
        this.filled = false;
        this.index = index;
        //this.rect = scene.add.rectangle(0, 0, 128,128, 0x808080, 1);
    }

    fillCell(element: string){
        this.element = element;
        this.filled = true;
    }

    emptyCell(){
        this.element = undefined;
        this.filled = false;
    }

    // getRect(){
    //     //return this.rect;
    // }

    getFilled(){
        return this.filled;
    }

    getIndex(){
        return this.index;
    }

    getPos(){
        return this.position;
    }

    setPos(x: number, y: number){
        this.position = [x, y];
    }

    getElement(){
        return this.element;
    }

    setColor(hexColor: number){
        this.fillColor = hexColor;
    }
}