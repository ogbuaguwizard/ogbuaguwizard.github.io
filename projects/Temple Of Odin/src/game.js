
import {objects,input} from "./scripts/build.js";
import {run} from "./scripts/gamestate.js";


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth  * .981;
canvas.height = window.innerHeight * .981;


function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the screen

    input.update();
    objects.forEach(object => {
        if(object.update) object.update();
        object.draw(ctx);
    });

}



function animate(){
    requestAnimationFrame(animate);
    run(render);
}
animate();
