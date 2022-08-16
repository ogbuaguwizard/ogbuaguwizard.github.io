import { spriteSheet } from "../scripts/assets.js";
import { originalTileSize,tileInRow,human} from "../scripts/build.js";
import { HYENA } from "../scripts/levels.js";
import { gameWorld } from "../scripts/build.js";
import collide from "../scripts/collision.js";

export default class Hyena{
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
        this.width = 30;
        this.height = 30;
        this.direction = "backward";
        this.canJump = true;
        this.animation = {
            count : 0,
            delay : 10,
            sprite : HYENA.left.idle,
            index : 0
        };
        this.action = {
            count : 0,
            delay : 100,
            index : 0
        }

    }
    moveForward(){
            this.direction = "forward";  // where character is facing
            this.animation.sprite = HYENA.right.walk;
            this.animation.delay = 5;
            this.action.delay = 150;
            this.action.count = 0;
            this.vx = 1;
    }
    moveBackward(){
            this.direction = "backward";
            this.animation.sprite = HYENA.left.walk;
            this.animation.delay = 5;
            this.action.delay = 150;
            this.action.count = 0;
            this.vx = -1;
    }
  
    idle(){
        this.animation.delay = 10;
        this.action.delay = 100;
        this.action.count = 0;
        if(this.direction == "forward"){
            this.animation.sprite = HYENA.right.idle;
            if(this.animation.index < 0) this.animation.index = 0;
        }
        if(this.direction == "backward"){
            this.animation.sprite = HYENA.left.idle;
            if(this.animation.index > this.animation.sprite.length - 1) this.animation.index = this.animation.sprite.length - 1; 
        }
    }
    stop(dir){
        this.moving = false;  
        if(dir == "x") this.vx = 0; 
    }
    attack(){
        this.isAttacking = true;
        this.animation.delay = 4;
        

        if(this.direction == "forward") {
            this.animation.sprite = HYENA.right.attack[0]; 
            this.animation.index = 0;
        }
        if(this.direction == "backward"){
            this.animation.sprite = HYENA.left.attack[0];
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
            // the original asset of enermies was facing backward
            if(this.direction == "backward" && this.animation.index > this.animation.sprite.length - 1){
                this.animation.index = 0;
                if(this.isAttacking){
                    this.isAttacking = false;
                    this.idle();
                }
            } 
            else if(this.direction == "forward" && this.animation.index < 0){
                this.animation.index = this.animation.sprite.length - 1;
                if(this.isAttacking){
                    this.isAttacking = false;
                    this.idle();
                }
            }
            let currentFrame = this.animation.sprite[this.animation.index];
            this.sourceX = Math.floor(currentFrame % tileInRow) *originalTileSize;
            this.sourceY = Math.floor(currentFrame / tileInRow) *originalTileSize;
            if(this.direction == "backward") this.animation.index++;
            if(this.direction == "forward")this.animation.index--;
        }

        let collisionDetails = collide(this,human);
        if(collisionDetails && collisionDetails.type == 'pixel'){
                console.log('pixel')
        }
        else if(collisionDetails && collisionDetails.type == 'bounding box' && ((collisionDetails.side == 'left' && this.direction == 'backward') || (collisionDetails.side == 'right' && this.direction == 'forward'))){
                if(collisionDetails.side == 'left' && this.direction == 'backward'){
                    this.moveBackward();
                } 
                if (collisionDetails.side == 'right' && this.direction == 'forward'){
                    this.moveForward();
                } 
        }
        else{   
            this.action.count++
            if(this.action.count >= this.action.delay){
                this.action.count = 0;
                if(this.action.index > 5) this.action.index = 0;
                switch(this.action.index){
                    case 0: //fall through
                    case 2:
                        this.direction = 'backward';
                        this.idle();
                        this.stop('x');
                        break;
                    case 1:
                        this.moveBackward();
                        break;
                    case 3:
                    case 5:
                        this.direction = 'forward';
                        this.idle();
                        this.stop('x');
                        break;
                    case 4:
                        this.moveForward();
                        break;
                }
                this.action.index++;
            }
        }
        // walls.forEach(wall =>{
        //     let collisionDetails = collide(this,wall);
        //     // if(collisionDetails.side == "top"){
        //     //     this.vy *= -0.3;
        //     // }
        //     // if(collisionDetails.side == "right"){
        //     //     this.vx *= -0.1;
        //     // }
        //     if(collisionDetails && collisionDetails.type == 'pixel'){
        //         if(collisionDetails.side == 'bottom'){ //bottom of ball since ball is the first argument
        //         this.y = wall.y - (this.height); // return to base
        //         if(!this.inAir) this.vy = 0; // stop vertical speed
        //         this.inAir = false;
        //         this.canJump = true;
        //         }  
        //     }
        //     else{
        //         this.vy += gameWorld.gravity;
        //     }
        // });

        this.x += this.vx;
        // this.y += this.vy;
    }
}
