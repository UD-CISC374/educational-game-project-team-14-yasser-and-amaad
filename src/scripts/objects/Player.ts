import { Inventory } from "./Inventory";
import { Math, GameObjects, Physics } from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    x: number;
    y: number;
    private velocity: Math.Vector2;
    private pSprite: Physics.Arcade.Sprite;
    
    private inventory: Inventory;
    
    constructor(scene: Phaser.Scene, x:number, y:number,pSprite:Physics.Arcade.Sprite) {
        super(scene, x, y, 'player');
        this.x = x;
        this.y = y;
        this.play('idle');
        this.velocity = new Phaser.Math.Vector2();
        this.pSprite = pSprite;

    }

    getVelocity(){
        return this.velocity;
    }

    getSprite(){
        return this.pSprite;
    }

    setSprite(pSprite){
        this.pSprite = pSprite;
    }

    // onFloor(){
    //     return this.pSprite.;
    // }
}