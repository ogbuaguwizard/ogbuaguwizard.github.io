import Paddle from "./modules/paddle.js";
import Ball from "./modules/ball.js";
import InputHandler from "./modules/inputHandler.js";
import {LEVELS, buildLevel} from "./modules/levels.js";
import Sound from "./modules/sounds.js";

const INIT = 10;
const LOADING = 20;
const READY = 30;
const PLAYING = 40;
const PAUSED = 50;
const MISSED = 60;
const OVER = 70;
const COMPLETE = 80;


let gameState;
function setGameState(value){
    gameState = value;
}

//assets
let assets = [];
let ballImg;
let brickImg;
let bounceSound;
let failSound;
let destroySound;
function loadAssets(){
    let imgToLoad = 2;
    let imgLoaded = 0;

    ballImg = new Image();
    ballImg.addEventListener('load', imgLoadedHandler, false);
    ballImg.src = "./assets/images/ball.png";

    brickImg = new Image();
    brickImg.addEventListener('load', imgLoadedHandler, false);
    brickImg.src = "./assets/images/brick.png";

    function imgLoadedHandler() {
        imgLoaded++;
        if(imgLoaded >= imgToLoad) {
            ballImg.ready = true;
            brickImg.ready = true;
            assets.push(ballImg,brickImg);
            ballImg.removeEventListener("load", imgLoadedHandler, false);
            brickImg.removeEventListener("load", imgLoadedHandler, false);
            loadsound();
        }
    }
    function loadsound(){
        bounceSound = new Sound("./assets/audio/bounce");
        failSound = new Sound('./assets/audio/missed')
        destroySound = new Sound('./assets/audio/jump')
        assets.push(bounceSound,failSound,destroySound);
    }
}

let ball;
let paddle;
let bricks
let objects;
let input;
function loadObjects(level){
    objects = [];
    //paddle
    let w = 120;
    let h = 15;
    let x = canvas.width/2 - w/2;
    let y = canvas.height - (h + 5);
    paddle = new Paddle(x,y,w,h,"blue",6);
    objects.push(paddle);

    //ball
    ball = new Ball(ballImg,10,300,15,15,5,3);
    objects.push(ball);

    //inputHandler
    input = new InputHandler(paddle);

    //bricks
    bricks = buildLevel(brickImg,LEVELS[level]);
    objects.push(...bricks)
    // console.log(objects)
    setGameState(READY);
}

let levelCount = LEVELS.length;

function startGame(){
    document.querySelector('#menuD').style.display = "none";
    document.querySelector('#pause').style.display = "block";
     setGameState(PLAYING);
}


function rectsCollide(r1, r2){
    return !(
    r1.x > r2.x + r2.width ||
    r1.x + r1.width < r2.x ||
    r1.y > r2.y + r2.height ||
    r1.y + r1.height < r2.y
    );
}


export {objects, assets, bounceSound,failSound, destroySound, ball, paddle, bricks, input, loadAssets, loadObjects, startGame, rectsCollide, setGameState, levelCount, gameState, INIT, LOADING, READY, PLAYING, PAUSED, MISSED, OVER, COMPLETE};