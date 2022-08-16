export class Home{
    constructor(sourceX,sourceY,x,y){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.x = x;
        this.y = y;
        
        // constant variables
        this.sourceDx = 64;
        this.sourceDy = 64;
        this.width = gameObjectSize;
        this.height = gameObjectSize;
    }
    draw(){
        ctx.drawImage(tileSheet,
                        this.sourceX,
                        this.sourceY,
                        this.sourceDx,
                        this.sourceDy,
                        this.x,this.y,
                        this.width,this.height);
    }
}