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
        this.vx = this.vy = 0;
    }
}