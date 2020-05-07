import { Inventory } from "./Inventory";
import { Math, GameObjects, Physics } from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    health: number;
    damage: number;
    x: number;
    y: number;
    private pSprite: string;
    body: Physics.Arcade.Body;
    activeCompound: string;
    
    private inventory: Inventory;
    
    constructor(scene: Phaser.Scene, x:number, y:number,pSprite:string, health:number, damage: number) {
        super(scene, x, y, pSprite);
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.play('idle');
        this.pSprite = pSprite;
        this.health = health;
        this.damage = damage;
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