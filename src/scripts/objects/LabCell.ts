import { Item } from "./Item";
import { GameObjects } from "phaser";

export class LabCell{
    private filled: boolean;
    private index: number;
    private position?: [number, number];
    private rect: GameObjects.Rectangle;
    private element?: string;

    constructor(scene:Phaser.Scene, index:number){
        this.filled = false;
        this.index = index;
        this.rect = scene.add.rectangle(0, 0, 128,128, 0x808080, 1);
    }

    fillCell(element: string){
        this.element = element;
        this.filled = true;
    }

    getRect(){
        return this.rect;
    }

    isFilled(){
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
        this.rect.fillColor = hexColor;
    }
}