import { GameObjects } from "phaser";
import { Item } from "./Item";

export class Compound extends Item{
    name: string
    symbol: string
    description: string
    image: GameObjects.Image
    
    constructor(name: string, symbol: string, description: string, image: GameObjects.Image) {
        super(name, symbol, description, image);
        this.name = name
        this.description = description
        this.symbol = symbol
        this.image = image;
        this.image.name = name;
    }

    
    toString() {
        return "Name: " + this.name + "\n" +
        "Symbol: " + this.symbol + "\n" +
        "Description: " + this.description; 
    }
}