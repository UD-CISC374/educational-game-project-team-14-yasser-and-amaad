export default class BasicAttack extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;
    
    constructor(scene, attackDirection){
        var x = scene.player.x;
        var y = scene.player.y;

        if(attackDirection == 1) {
            super(scene, x + 70, y, "basic_attack");
        } else {
            super(scene, x - 70, y, "basic_attack");
        }
        
        scene.add.existing(this);
        
        this.play("basic_attack_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 700 * attackDirection;

        this.body.setAllowGravity(false);
        this.setScale(5);
        if(attackDirection === 1)
            this.setRotation(this.degreesToRadians(90));
        else
            this.setRotation(this.degreesToRadians(-90));

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