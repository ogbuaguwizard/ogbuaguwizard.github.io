export class collectables{
    constructor(sourceX,sourceY,x,y){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.x = x;
        this.y = y;
        this.collected = false; 
        this.count = 0;
        this.frameIndex = 0;
        this.maxFrame = false;
        
        // constant variables
        this.delay = 10;
        this.sourceDx = 64;
        this.sourceDy = 64;
        this.width = 20;//gameObjectSize;
        this.height = 20;//gameObjectSize;
    }
    nextFrame(){
        if(this.maxFrame == true){
            this.frameIndex--;
        }else{
            this.frameIndex++;
        } 
    }
    draw(){
        if(!this.collected){
        ctx.drawImage(tileSheet,
                        this.sourceX,
                        this.sourceY,
                        this.sourceDx,
                        this.sourceDy,
                        this.x,this.y,
                        this.width,this.height);
        }
    }
    update(){
        this.count++;
        if(this.count >= this.delay){
            this.count = 0;
            if(this.frameIndex <= 0) this.maxFrame = false;
            if(this.frameIndex >= COIN.length - 1) this.maxFrame = true;
            let currentFrame = COIN[this.frameIndex];
            this.sourceX = Math.floor(currentFrame % tileInRow) *originalTileWidth;
            this.sourceY = Math.floor(currentFrame / tileInRow) *originalTileHeight;
            this.nextFrame();
            //console.log(this.frameIndex)
        }
    }
}