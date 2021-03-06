import { GameObjects, Physics } from "phaser";
import { Item } from "./Item";

export class Element extends Item{
    name: string
    symbol: string
    description: string
    atomicNum: number
    atomicWeight: number
    image: GameObjects.Image
    
    constructor(name: string, symbol: string, description: string, atomicNum: number, atomicWeight: number, image: GameObjects.Image) {
        super(name, symbol, description, image);
        this.name = name;
        this.description = description;
        this.symbol = symbol
        this.atomicNum = atomicNum
        this.atomicWeight = atomicWeight
        this.image = image;
        this.image.name = name;
    }

    toString() {
        return "Name: " + this.name + "\n" +
        "Symbol: " + this.symbol + "\n" +
        "Atomic #: " + this.atomicNum + "\n" + 
        "Atomic Weight: " + this.atomicWeight + "\n" +   
        "Description: " + this.description; 
    }

}