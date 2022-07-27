export default class Paddle{
    constructor(x,y,w,h,c,s){
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.speed = { x : s};
      this.vx = 0;
      this.color = c
    }
    draw(ctx){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    moveRight(){
              this.vx = Math.abs(this.speed.x); 
    }
    moveLeft(){
              this.vx = -this.speed.x;
    }
    stop(dir){
      if(dir == "x") this.vx = 0;
    }
    update(canvas){
      this.x += this.vx;

      if(this.x < 0) this.x = 0;
      if(this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }
  }