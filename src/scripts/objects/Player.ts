export default class Player extends Phaser.Physics.Arcade.Sprite {
    private inventory;
    
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, 'player');
    }
}