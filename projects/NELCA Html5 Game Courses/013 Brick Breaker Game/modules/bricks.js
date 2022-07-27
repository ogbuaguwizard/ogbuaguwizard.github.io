import {ball, rectsCollide, destroySound} from "../game.js";
export default class Brick{
    constructor(img,x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = img;
        this.destroyed = false;
    }
    draw(ctx){
        if(!this.destroyed)
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    destroy(){
        this.destroyed = true;
    }
    update(){
        if(!this.destroyed && rectsCollide(this,ball)){
            this.destroy();
            destroySound.play();
            ball.speed.y = -ball.speed.y;
        }
    }

}