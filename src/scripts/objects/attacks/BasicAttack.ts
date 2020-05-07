export default class BasicAttack extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;
    
    constructor(scene, attackDirection){
        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, "basic_attack");
        scene.add.existing(this);
        
        this.play("basic_attack_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 700 * attackDirection;

        this.body.setAllowGravity(false);
        this.setScale(5);
<<<<<<< HEAD
        this.setRotation(this.degreesToRadians(90));
=======
        this.setRotation(1.5);
>>>>>>> enemies
        scene.projectiles.add(this);
    }

    degreesToRadians(degrees):number {
        return degrees * (Math.PI/180)
    }

    update () {
        if(this.x > this.scene.physics.world.bounds.width){
            this.destroy();
        }
    }


}