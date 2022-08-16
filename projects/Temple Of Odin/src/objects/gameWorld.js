export default class GameWorld{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height= height;
        this.gravity = 0.01;
    }
}
// let gameWorld = new GameWorld(0,gameObjectSize*mapCols,gameObjectSize*mapRows);