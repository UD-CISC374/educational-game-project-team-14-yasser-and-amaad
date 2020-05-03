import { Item } from "./Item";

export class InvCell{
    x: number;
    y: number;
    width: number;
    height: number;
    filled: boolean;
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.filled = false;
    }
}