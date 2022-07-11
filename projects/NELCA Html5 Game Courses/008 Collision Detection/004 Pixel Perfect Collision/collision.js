/*
2d pixel-perfect collision detection

Requires that each object has a rectangular bounding box (simple x/y/w/h, no rotation)
and a bit mask (i.e. an array of lines and columns containing 0s for empty pixels and 1s for solid pixels).

On each frame of the animation, take all pairs of objects and
1. compare the bounding boxes
2. for those that collide, check for overlayed bits by creating a new mask that is the AND of the 2 sub-masks and check for 1s

*/

function collide(o1, o2,Xoverlap) {
  let xs = [o1, o2].sort(function(a, b) {return a.x - b.x;}); //object with smallest x comes first in xs
  let ys = [o1, o2].sort(function(a, b) {return a.y - b.y;}); //object with smallest y comes first in ys

  //Calculate the distance vector
  let vx = (o1.x + (o1.width /2)) - (o2.x + (o2.width /2));
  let vy = (o1.y + (o1.height / 2)) - (o2.y + (o2.height / 2));
  
  // Do bounding boxes collide
  if(xs[0].x + xs[0].width > xs[1].x && ys[0].y + ys[0].height > ys[1].y) {
    // Create the collision bounding box
    let cBounding = {};
    cBounding.x = xs[1].x; //the lergest x and y, which is also the begining of the collision bounding box
    cBounding.y = ys[1].y; //
    cBounding.width = Math.min(xs[0].x + xs[0].width, xs[1].x + xs[1].width) - cBounding.x;
    cBounding.height = Math.min(ys[0].y + ys[0].height, ys[1].y + ys[1].height) - cBounding.y;


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
 
    // Overlay the 2 masks within the collision bounding box and return as soon as a 1 is found
    for(let x = 0; x < cBounding.width; x ++) {
      for(let y = 0; y < cBounding.height; y ++) {

        let bit1 = o1.mask[y + cBounding.y - o1.y][x + cBounding.x - o1.x];
        let bit2 = o2.mask[y + cBounding.y - o2.y][x + cBounding.x - o2.x];
        if(bit1 && bit2) {
          if(Xoverlap) removeOverlap(o1,o2);
          return { 
            x : x + cBounding.x, // first cell(x,y) where collision is detected
            y : y + cBounding.y, //
            overlapX : cBounding.width, // full object(image) overlap
            overlapY : cBounding.height, //
            collisionSide : collisionSide
         };
        }
      }
    }
  }
};

//controlling the perfect pixel overlap
function removeOverlap(o1,o2){
  if(o1.x < o2.x){
    o1.x = o1.x - 1;
  }
  else{
    o1.x = o1.x + 1;
  }
  if(o1.y < o2.y){
    o1.y = o1.y - 1;
  }
  else{
    o1.y = o1.y + 1;
  }
}

