import Brick from "./bricks.js";

export function buildLevel(img,level){
    let bricks = [];
    let w = 45;
    let h = 20;
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick == 1){
                let x = w * brickIndex;
                let y = 30 + h * rowIndex;
                bricks.push(new Brick(img,x,y,w,h))
            }
        });
    });
    return bricks;
}

export const LEVELS = {
    1 :[ 
        [0, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    ],
    2 :[ 
        [1, 0, 1, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 1, 1, 0, 1, 0, 1, 1]
    ],
    3 :[
        [1, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 1, 0]
    ],

    'length' : 3
}