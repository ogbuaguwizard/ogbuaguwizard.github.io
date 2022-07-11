
export default class Vehicle{
    constructor(model,x,y,width,height,src,speed,mask){
        this.model = model;
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = src;
        this.speed = speed;
        this.mask = mask;
        this.currentSpeed = {x : 0,
                             y : 0}
    }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    moveForward(){
        this.currentSpeed.y = -this.speed;
    }
    moveBackward(){
        this.currentSpeed.y = this.speed;
    }
    moveRight(){
        this.currentSpeed.x = this.speed; 
    }
    moveLeft(){
        this.currentSpeed.x = -this.speed;
    }
    stop(direction){
        if(direction == 'x') this.currentSpeed.x = 0;
        if(direction == 'y') this.currentSpeed.y = 0;
    }
    update(canvas,objects){
        this.percentageX = this.x / canvas.width;
        this.percentageY = this.y / canvas.height;
        
        objects.filter(item => item != this).forEach(object => {
            let collisionDetails = collide(this,object,true);
            if(collisionDetails){
                console.log(this.model, collisionDetails.collisionSide, " to ", object.model);
            }
            else{
                this.x += this.currentSpeed.x;
                this.y += this.currentSpeed.y;

				if(this.x < 0) this.x = 0;
				if(this.x + this.width > canvas.width) this.x = canvas.width - this.width;
				if(this.y < 0) this.y = 0;
				if(this.y + this.height > canvas.height) this.y = canvas.height - this.height;
            } 
        });
    }
}
