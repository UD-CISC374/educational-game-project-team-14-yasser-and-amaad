import { Item } from "./Item";

export class Inventory{
    inv: Array<Item>;
    row: number;
    col:number;
    color;

    constructor(row, col, color){
        this.row = row;
        this.col = col;
        this.color = color;
    }

    addItem(item){
        if(this.inv.length == this.col){
            item.vy = -4;
            return false;
        }
        this.inv.push(item);
        return true;
    }

}