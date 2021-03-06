import { GameObjects } from "phaser";

export class Item {
    name: string;
    amount: number;
    symbol: string;
    description: string;
    image: GameObjects.Image;
    vx: number;
    vy: number;
    
    constructor(name: string, symbol: string, description: string,  image: GameObjects.Image) {
        this.name = name;
        this.description = description;
        this.symbol = symbol
        this.image = image;
        this.image.name = name;
        this.vx = this.vy = 0;
    }

    copyElement(): Item{
        return new Item(this.name, this.symbol, this.description, this.image);
    }

    toString() {
        return "Name: " + this.name + "\n" +
        "Symbol: " + this.symbol + "\n" +  
        "Description: " + this.description; 
    }
}