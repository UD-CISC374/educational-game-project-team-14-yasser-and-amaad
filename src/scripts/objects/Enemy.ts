import { GameObjects, Physics } from "phaser";

export default class Enemy extends Physics.Arcade.Image {
    health: number;
    damage: number;
    SPEED: number = 200;
    monsterType: string;
    x: number;
    y: number;

    constructor(scene:Phaser.Scene,x: number, y: number,enemyImage: string, health: number, damage: number, monsterType: string, scale?: number) {
        super(scene, x, y, enemyImage);
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.health = health;
        this.damage = damage;
        this.monsterType = monsterType;
        if(scale !== undefined){
            this.setScale(scale);
        }
    }

    //no movement yet
    movement(){
        
    }
}