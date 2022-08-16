
export default function collide(o1, o2,bound) {
    let xs = [o1, o2].sort(function(a, b) {return a.x - b.x;}); //object with smallest x comes first in xs
    let ys = [o1, o2].sort(function(a, b) {return a.y - b.y;}); //object with smallest y comes first in ys

    //Calculate the distance vector
    let vx = (o1.x + (o1.width /2)) - (o2.x + (o2.width /2));
    let vy = (o1.y + (o1.height / 2)) - (o2.y + (o2.height / 2));

    let smallestX;
    let smallestY;
    if(bound){
        smallestX = xs[0].x + xs[0].width + bound.x;
        smallestY = ys[0].y + ys[0].height + bound.y;  
    }
    else{
        smallestX = xs[0].x + xs[0].width;
        smallestY = ys[0].y + ys[0].height
    }
    // Do bounding boxes collide
    if(smallestX > xs[1].x && smallestY > ys[1].y) {
        // Create the collision bounding box
        let cBounding = {};
        cBounding.x = xs[1].x; //the lergest x and y, which is also the begining of the collision bounding box
        cBounding.y = ys[1].y; //
        cBounding.width = Math.min(xs[0].x + xs[0].width, xs[1].x + xs[1].width) - cBounding.x;
        cBounding.height = Math.min(ys[0].y + ys[0].height, ys[1].y + ys[1].height) - cBounding.y;

        let collisionSide;
        if(cBounding.width >= cBounding.height){
          //The collision is happening on the X axis.
            if(vy > 0){
                collisionSide = "top"; //with respect to the first argument while calling the collide function    
            }
            else{
                collisionSide = "bottom";
            }
        }
        else{
            //The collision is happening on the Y axis.
            if(vx > 0){
                collisionSide = "left";
            }
            else{
                collisionSide = "right";
            }
        }
        //create a defferent canvas element
        let c = document.createElement('canvas');
        c.width = innerWidth;
        c.height = innerHeight;
        let cx = c.getContext('2d');
        document.body.appendChild(c);
        //draw the images
        o1.draw(cx);
        o2.draw(cx);
        //get the imageData
        let o1ImageData = cx.getImageData(o1.x,o1.y,o1.width,o1.height);
        let o2ImageData = cx.getImageData(o2.x,o2.y,o2.width,o2.height);
        //cx.clearRect(0,0,canvas.width,canvas.height);
        // pixel collision
        for(let i = cBounding.x; i < cBounding.width; i++){
            for(let j = cBounding.y; j < cBounding.height; j++){
              
                let o1Pixel = ((i-o1.x ) + (j-o1.y )*o1.width )*4 + 3 ; 
                let o2Pixel = ((i-o2.x) + (j-o2.y)*o2.width)*4 + 3 ;
                if ( o1ImageData.data[o1Pixel] !== 0 && o2ImageData.data[o2Pixel] !== 0){  
                    c.remove();
                    return {
                        x : i + cBounding.x, // first cell(x,y) where collision is detected
                        y : j + cBounding.y, //
                        side : collisionSide,
                        type : "pixel",
                        overlapX : cBounding.width, // full object(image) overlap
                        overlapY : cBounding.height, //                      
                    };
                }
            }
        }
        c.remove();
        return {
          side : collisionSide,
          type : "bounding box",
          overlapX : cBounding.width,
          overlapY : cBounding.height  
        };
    }
};

//if side is 'top' add overlapY to objects y to remove overlap
//if side is 'bottom' sutract it
//if side is 'left' add overlapx to objects x to remove overlap
//if side is 'right' sutract it
