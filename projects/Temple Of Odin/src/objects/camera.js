export class Camera{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height= height;
    }
    update(){
        this.width = canvas.width;

        this.topInnerBoundary = this.y + (this.height * 0.4); 
        this.bottomInnerBoundary = this.y + (this.height * 0.6); 
        this.leftInnerBoundary = this.x + (this.width * 0.25); 
        this.rightInnerBoundary = this.x + (this.width * 0.35); 

        if(character.y < this.topInnerBoundary){ 
            this.y -= Math.floor(Math.abs(character.y  - this.topInnerBoundary));
        }
        if(character.y + character.height > this.bottomInnerBoundary){ 
            this.y += Math.floor(character.y + character.height - this.bottomInnerBoundary);
        }
        if(character.x  < this.leftInnerBoundary){ 
            this.x -= Math.floor(Math.abs(character.x + this.leftInnerBoundary)); 
        }
        if(character.x + character.width > this.rightInnerBoundary){ 
            this.x += Math.floor(character.x + character.width - this.rightInnerBoundary);
        }
        

        if(this.x < gameWorld.x){ 
            this.x = gameWorld.x;
        }
        if(this.x + this.width > gameWorld.x + gameWorld.width){ 
            this.x = gameWorld.x + gameWorld.width - this.width;
        }
        if(this.y + this.height > gameWorld.y + gameWorld.height){ 
            this.y = gameWorld.y + gameWorld.height - this.height;
        }

    }
}
// let camera = new Camera(0,0,canvas.width,canvas.height); 