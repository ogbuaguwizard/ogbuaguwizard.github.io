export class Heart{
    constructor(sourceX,sourceY,x,y){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.x = x;
        this.y = y;
        
        // constant variables
        this.sourceDx = 64;
        this.sourceDy = 64;
        this.width = gameObjectSize * 0.6;
        this.height = gameObjectSize * 0.6;
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
    update(index){
        this.x = camera.x + index*this.width;
        this.y = camera.y + 10;
        //this.y = this.width;      
        switch(ball.live){   // the loop will never get to trial(ie hearts.length.)
            case index :
                this.sourceX = originalTileWidth;
                //this.sourceY = 1*originalTileHeight; this doesn't havr to change
                break;
            } 
    }
}     