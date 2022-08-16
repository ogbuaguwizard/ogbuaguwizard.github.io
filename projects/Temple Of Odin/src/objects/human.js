import { spriteSheet } from "../scripts/assets.js";
import { gameWorld,originalTileSize,tileInRow,walls,enermies} from "../scripts/build.js";
import { HUMAN } from "../scripts/levels.js";
import collide from "../scripts/collision.js";

export default class Human{
    constructor(sourceX,sourceY,x,y){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.x = x;
        this.y = y;
        this.vx = 0; 
        this.vy = 0;
        this.maxVx = 6.5;
        this.sourceDx = originalTileSize;
        this.sourceDy = originalTileSize;
        this.width = 40;
        this.height = 40;
        this.direction = "forward";
        this.canJump = true;
        this.animation = {
            count : 0,
            delay : 10,
            sprite : HUMAN.right.idle,
            index : 0,

        }

    }
    moveForward(){
        if(this.direction != "climbing"){
            this.direction = "forward";  // where character is facing
            this.moving = true;          // walking, running or climbing
            this.animation.sprite = HUMAN.right.walk;
            this.animation.delay = 5;
            this.vx = 0.8;
        }   
    }
    moveBackward(){
        if(this.direction != "climbing"){
            this.direction = "backward";
            this.moving = true;
            this.animation.sprite = HUMAN.left.walk;
            this.animation.delay = 5;
            this.vx = -0.8;
        }
    }
    climbUpward(){
        this.direction = "climbing";
        this.moving = true;
        this.animation.sprite = HUMAN.climb;
        this.animation.delay = 10;
    }
    climbDownward(){
        this.direction = "climbing";
        this.moving = true;
        this.animation.sprite = HUMAN.climb;
        this.animation.delay = 10;
    }
    run(direction,jump){
        if(direction == "forward"){
            this.direction = "forward";
            this.moving = true;
            this.animation.sprite = HUMAN.right.run;
            if(jump) this.jump('forward',2,5);
            else this.vx = 1.5;
        }
        if(direction == "backward"){
            this.direction = "backward";
            this.moving = true;
            this.animation.sprite = HUMAN.left.run;
            if(jump) this.jump('backward',2.3,5.3);
            else this.vx = -1.5;
        }
    }
    jump(direction,x = 1.8, y = 4){
        if(this.canJump){
            this.inAir = true;
            this.animation.delay = 7;
    
            if(direction == 'up'){ //although i don't have a jump up animation
                if(this.direction == "forward"){
                    this.animation.sprite = HUMAN.right.jump;
                    this.animation.index = 0;
                }
                if(this.direction == "backward"){
                    this.animation.sprite = HUMAN.left.jump;
                    this.animation.index = this.animation.sprite.length - 1;
                }
                this.vy = -y ;
            }
            if(direction == 'forward'){  
                this.direction = "forward";
                this.animation.sprite = HUMAN.right.jump;
                this.animation.index = 0;
                this.vx = x;        
                this.vy = -y ;
            }
            if(direction == 'backward'){  
                this.direction = "backward";
                this.animation.sprite = HUMAN.left.jump;
                this.animation.index = this.animation.sprite.length - 1;
                this.vx = -x;        
                this.vy = -y ;
            }
            this.canJump = false;
        }  
    }
    push(){
        this.animation.sprite = HUMAN.right.grab;
    }
    pull(){
        this.animation.sprite = HUMAN.left.grab;
    }
    idle(){
        this.moving = false;
        this.animation.delay = 10;
        if(this.direction == "forward"){
            this.animation.sprite = HUMAN.right.idle;
            if(this.animation.index < 0) this.animation.index = 0;
        }
        if(this.direction == "backward"){
            this.animation.sprite = HUMAN.left.idle;
            if(this.animation.index > this.animation.sprite.length - 1) this.animation.index = this.animation.sprite.length - 1; 
        }
    }
    stop(dir){
        this.moving = false;  
        if(dir == "x") this.vx = 0; 
        if(dir == "y") this.vy = 0;
    }
    attack(){
        this.isAttacking = true;
        this.animation.delay = 4;
        

        if(this.direction == "forward") {
            this.animation.sprite = HUMAN.right.attack[0]; 
            this.animation.index = 0;
        }
        if(this.direction == "backward"){
            this.animation.sprite = HUMAN.left.attack[0];
            this.animation.index = this.animation.sprite.length - 1;
        }
        

    }
    hurt(){

    }
    die(){

    }
    draw(ctx){
        ctx.drawImage(spriteSheet.img,
                        this.sourceX,
                        this.sourceY,
                        this.sourceDx,
                        this.sourceDy,
                        this.x,this.y,
                        this.width,this.height);
    }
    update(){
        this.animation.count++;
        if(this.animation.count >= this.animation.delay){
            this.animation.count = 0;
            if(this.direction == "forward" && this.animation.index > this.animation.sprite.length - 1){
                this.animation.index = 0;
                if(this.isAttacking){
                    this.isAttacking = false;
                    this.idle();
                }
                if(this.inAir){
                    this.inAir = false;
                    this.idle();
                }
            } 
            else if(this.direction == "backward" && this.animation.index < 0){
                this.animation.index = this.animation.sprite.length - 1;
                if(this.isAttacking){
                    this.isAttacking = false;
                    this.idle();
                }
                if(this.inAir){
                    this.inAir = false;
                    this.idle();
                }
            }
            let currentFrame = this.animation.sprite[this.animation.index];
            this.sourceX = Math.floor(currentFrame % tileInRow) *originalTileSize;
            this.sourceY = Math.floor(currentFrame / tileInRow) *originalTileSize;
            if(this.direction == "forward") this.animation.index++;
            if(this.direction == "backward")this.animation.index--;
        }

        walls.forEach(wall =>{
            let collisionDetails = collide(this,wall);
            // if(collisionDetails.side == "top"){
            //     this.vy *= -0.3;
            // }
            // if(collisionDetails.side == "right"){
            //     this.vx *= -0.1;
            // }
            if(collisionDetails && collisionDetails.type == 'bounding box'){ // latter to pixel
                if(collisionDetails.side == 'bottom'){ //bottom of ball since ball is the first argument
                this.y = wall.y - (this.height); // return to base
                if(!this.inAir) this.vy = 0; // stop vertical speed
                this.inAir = false;
                this.canJump = true;
                }  
            }
            else{
                this.vy += gameWorld.gravity;
            }
        });

        this.x += this.vx;
        this.y += this.vy;
    }
}