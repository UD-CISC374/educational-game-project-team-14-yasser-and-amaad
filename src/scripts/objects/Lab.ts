import { Element } from "./Element"
import { Compound } from "./Compound"
import { Recipe } from "./Recipe"

export class Lab {
    elements: Element[];
    compounds: Compound[]
    recipes: Recipe[]

    constructor(elements: Element[], compoounds: Compound[], recipes: Recipe[]) {
        this.elements = elements
        this.compounds = compoounds
        this.recipes = recipes
    }
    public addElement(element: Element) {
        this.elements.push(element);
    }

    public addCompount(compound: Compound) {
        this.compounds.push(compound);
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    public printElements() {
        console.log(this.elements)
    }
}