import { GameObjects } from "phaser";

export class Compound {
    name: string
    symbol: string
    description: string
    image: GameObjects.Image
    
    constructor(name: string, symbol: string, description: string, image: GameObjects.Image) {
        this.name = name
        this.description = description
        this.symbol = symbol
        this.image = image
    }
}