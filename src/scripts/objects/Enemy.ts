export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene) {
        var x = scene.enemy.x;
        var y = scene.enemy.y;
        super(scene, x, y, 'enemy');
    }
}