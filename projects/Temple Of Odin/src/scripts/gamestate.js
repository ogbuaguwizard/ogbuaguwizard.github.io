import { levels,currentLevel } from "./levels.js";
import {createObjects,objects} from "./build.js";
import {loadAssets,assets} from "./assets.js";

const STATE_INIT = 10;
const STATE_LOADING = 20;
const STATE_READY = 30
const STATE_PLAYING = 40;
const STATE_PAUSED = 50
const STATE_RESTART = 60;
const STATE_OVER = 70;
const STATE_COMPLETE = 80;
 
let gameState = STATE_INIT;
function setGameState(state){
    gameState = state;
}

let logedState = false;
let called = false;
//<--------------------------------------------------------------------------------------------------->
function run(render) {
    
    switch(gameState) {
        case STATE_INIT:
            if(!logedState) console.log("initializing");
            logedState = true;
            // init(true);
            if(!called){
                loadAssets();
                called = true;
            }
            if(assets.every(asset => asset.ready = true)) setGameState(STATE_LOADING);
            break;
            break;
        case STATE_LOADING:
            if(!logedState) console.log("loading");
            logedState = true;
            createObjects(levels[currentLevel]);
            setGameState(STATE_PLAYING)
            break;
        case STATE_READY:
            if(!logedState) console.log("getting ready");
            logedState = true;
            // startGame();
            // setGameState(STATE_PLAYING)
            break;
        case STATE_PLAYING:
            if(!logedState) console.log("playing");
            logedState = true;
            render();
            break;
        case STATE_PAUSED:
            if(!logedState) console.log("paused");
            logedState = true;
            break;
        case STATE_RESTART:
            
            break;
        case STATE_OVER:
            if(!logedState) console.log("game over");
            logedState = true;
            ctx.drawImage(tileSheet, 256, 192, ball.sourceDx, ball.sourceDy,
                       canvas.width/2 - 100, canvas.height/2 - 100, 200, 200);
            break;
        case STATE_COMPLETE:
            if(!logedState) console.log("Level Complete");
            logedState = true;
            break;
    }
 }


 export {run};