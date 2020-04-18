import { GameObjects } from "phaser";

export class Recipe {
    name: string
    ingredients: Element[]
    description: string
    image: GameObjects.Image
    
    constructor(name: string, symbol: string, description: string, image: GameObjects.Image) {
        this.name = name
        this.description = description
        this.image = image
    }

    addToIngredient(element: Element) {
        this.ingredients.push(element)
    }
}