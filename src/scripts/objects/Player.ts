import { Inventory } from "./Inventory";
import { Math, GameObjects, Physics } from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    health: number;
    damage: number;
    jumpHeight: number;
    runSpeed: number;
    x: number;
    y: number;
    private pSprite: string;
    body: Physics.Arcade.Body;
    activeCompound: string;
    magicBall: String;
    
    private inventory: Inventory;
    
    constructor(scene: Phaser.Scene, x:number, y:number,pSprite:string, health:number, damage: number, magicBall?: string) {
        super(scene, x, y, pSprite);
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.play('idle');
        this.pSprite = pSprite;
        this.health = health;
        this.damage = damage;
        if(magicBall){
            this.magicBall = magicBall;
        }
        this.jumpHeight = -1000;
        this.runSpeed = 650
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