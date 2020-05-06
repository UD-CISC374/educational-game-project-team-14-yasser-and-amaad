export default class BasicAttack extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;
    
    constructor(scene, attackDirection){
        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, "basic_attack");
        scene.add.existing(this);
        
        this.play("basic_attack_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 1000 * attackDirection;

        this.body.setAllowGravity(false);
        this.setScale(2);
        this.setRotation(90);
        scene.projectiles.add(this);
    }

    update () {
        if(this.x > this.scene.physics.world.bounds.width){
            this.destroy()
        }
    }


}