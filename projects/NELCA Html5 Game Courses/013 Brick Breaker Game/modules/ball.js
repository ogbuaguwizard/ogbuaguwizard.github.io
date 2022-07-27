import {paddle, gameState, setGameState, rectsCollide, bounceSound, failSound, MISSED, OVER} from "../game.js";

export default class Ball{
    constructor(img,x,y,w,h,s,l){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speed = {x : s, y : s/2};
        this.image = img;
        this.live = l;
    }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    update(canvas){
        
            if(this.x + this.width > canvas.width || this.x < 0) {
                bounceSound.play();
                this.speed.x = -this.speed.x;
            }
            if(this.y < 0 || rectsCollide(this,paddle)){
                bounceSound.play();
                this.speed.y = -this.speed.y;
            }
            else if(this.y + this.height > canvas.height){
                failSound.play();
                this.live--;
                this.x = 10;
                this.y = paddle.y - this.height;
                this.speed.y = -this.speed.y;
                (this.live < 1) ? setGameState(OVER) : setGameState(MISSED);
            }
        this.x += this.speed.x;
        this.y -= this.speed.y;

    }
}