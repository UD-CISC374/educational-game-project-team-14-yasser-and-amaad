import { GameObjects } from "phaser";

export class Element {
    name: string
    symbol: string
    description: string
    atomicNum: number
    atomicWeight: number
    image: GameObjects.Image
    
    constructor(name: string, symbol: string, description: string, atomicNum: number, atomicWeight: number, image: GameObjects.Image) {
        this.name = name;
        this.description = description;
        this.symbol = symbol
        this.atomicNum = atomicNum
        this.atomicWeight = atomicWeight
        this.image = image;
    }
}