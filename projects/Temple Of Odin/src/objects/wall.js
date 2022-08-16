import {spriteSheet}  from "../scripts/assets.js";
import { originalTileSize,mapRows } from "../scripts/build.js";

export default class Wall{
    constructor(sourceX,sourceY,col,row){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.col = col;
        this.row = row;
        this.x = col*30;
        this.y = canvas.height - 30*(mapRows-row);
        
        // constant variables
        this.sourceDx = originalTileSize;
        this.sourceDy = originalTileSize;
        this.width = 30;
        this.height =30;
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
}