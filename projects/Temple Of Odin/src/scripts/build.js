import {WALL,EMPTY,levels,currentLevel} from "../scripts/levels.js"
import Wall from "../objects/wall.js";
import Human from "../objects/human.js";
import Hyena from "../objects/hyena.js";
import InputHandler from "./inputHandler.js";
import GameWorld from "../objects/gameWorld.js" ;

// tilesheet infomation
let tileInRow = 22;
let originalTileSize = 48;
 let gameObjectSize= 30;

// Map information
let mapRows = levels[currentLevel].length;
let mapCols = levels[currentLevel][0].length;


// let credit;
// let home;
let objects = [];
let walls = [];
let enermies = [];
let human;
let input;
let gameWorld;

function createObjects(levelMap){
    //map
    for(var row = 0; row < mapRows; row++){ 
        for(var col = 0; col < mapCols; col++){ 
            var currentTile = levelMap[row][col] - 1; //remove 1 
            if(currentTile != EMPTY){ 
                //Find the tile's X and Y positions on the sprite sheet 
                var sourceX = Math.floor(currentTile % tileInRow) *originalTileSize;
                var sourceY = Math.floor(currentTile / tileInRow) *originalTileSize;
                        
                switch (currentTile){ 						
                    case WALL.find(function(y){return y == currentTile;}): //checks if the currentTile is in the WALL array
                        let wall = new Wall(sourceX,sourceY,col,row);
                        objects.push(wall);
                        walls.push(wall);
                        break; 
                    case 192:
                        let hyena = new Hyena(sourceX,sourceY,col*30,canvas.height - (30 + 30*(mapRows-row-1)))
                        objects.push(hyena);
                        enermies.push(hyena);
                        break;
                    case 0:
                        human = new Human(sourceX,sourceY,col*30,canvas.height - (30 + 30*(mapRows-row-1)));
                        objects.push(human);
                        break;
                    
                    
                    // case OBSTACLE.find(function(y){return y == currentTile;}): //checks if the currentTile is in the OBSTACLE array
                    //     var obstacle = new Obstacle(sourceX,sourceY,col*gameObjectSize,canvas.height - (gameObjectSize + gameObjectSize*(mapRows-row-1)));
                    //     objects.push(obstacle);
                    //     obstacles.push(obstacle);
                    //     break;
                    // case FIRE.find(function(y){return y == currentTile;}): //checks if the currentTile is in the FIRE array
                    //     var fire = new Fire(sourceX,sourceY,col*gameObjectSize,canvas.height - gameObjectSize*(mapRows-row));
                    //     objects.push(fire);
                    //     fireArr.push(fire);
                    //     break; 
                    // case COIN.find(function(y){return y == currentTile;}): //checks if the currentTile is in the COIN array
                    //     var coin = new Coin(sourceX,sourceY,col*gameObjectSize,canvas.height - (gameObjectSize + gameObjectSize*(mapRows-row-1)));
                    //     objects.push(coin);
                    //     coins.push(coin);
                    //     break;
                    // case HOME:
                    //     home = new Home(sourceX,sourceY,col*gameObjectSize,canvas.height - (gameObjectSize + gameObjectSize*(mapRows-row-1)));
                    //     objects.push(home);
                }
            }
        }
    }


    gameWorld = new GameWorld(0,gameObjectSize*mapCols,gameObjectSize*mapRows);
    input = new InputHandler(human,0);

    console.log("loading complete");
    // logedState = false;
    // gameState = STATE_READY;
}


export {createObjects,originalTileSize,mapRows,tileInRow,objects,gameWorld,walls,human,enermies,input}