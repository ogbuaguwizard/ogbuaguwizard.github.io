import gameImage from "./images.js";
import Sound from "./sounds.js";


let spriteSheet;
let assets = [];
function loadAssets(){
    spriteSheet = new gameImage("./Temple Of Odin/assets/images/tod.png");
    assets.push(spriteSheet);
}

export {loadAssets,assets,spriteSheet};
