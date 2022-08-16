
function rectCollide(r1, r2, noOverlap, bounce){
    //Set bounce and noOverlap to a default value of false if it's not specified
    if(typeof bounce === "undefined") bounce = false;
    if(typeof noOverlap === "undefined") noOverlap = false;

    //Create an optional collision vector object to represent the bounce surface
    var s = {};
    //A variable to tell us which side the collision is occurring on
    var collisionSide = "";
    //Calculate the distance vector
    var vx = (r1.x + (r1.width /2)) - (r2.x + (r2.width /2));
    var vy = (r1.y + (r1.height / 2)) - (r2.y + (r2.height / 2));
    //Figure out the combined half-widths and half-heights
    var combinedHalfWidths = r1.width / 2 + r2.width / 2;
    var combinedHalfHeights = r1.height / 2 + r2.height / 2;
    //Check whether vx is less than the combined half widths
    if(Math.abs(vx) < combinedHalfWidths){
        //A collision might be occurring!
        //Check whether vy is less than the combined half heights
        if(Math.abs(vy) < combinedHalfHeights){
            //A collision has occurred! This is good!
            //Find out the size of the overlap on both the X and Y axes
            var overlapX = combinedHalfWidths - Math.abs(vx);
            var overlapY = combinedHalfHeights - Math.abs(vy);

            //The collision has occurred on the axis with the
            //*smallest* amount of overlap. Let's figure out which
            //axis that is
            if(overlapX >= overlapY){
                //The collision is happening on the X axis, but on which side? vy can tell us
                if(vy > 0){
                    collisionSide = "top";
                    //Move the rectangle out of the collision
                    if(noOverlap) r1.y = r1.y + overlapY;
                }
                else{
                collisionSide = "bottom";
                //Move the rectangle out of the collision
                if(noOverlap)r1.y = r1.y - overlapY;
                }

                //Bounce
                if(bounce) r1.vy *= -1;
            }
            else{
                //The collision is happening on the Y axis, but on which side? vx can tell us
                if(vx > 0){
                    collisionSide = "left";
                    //Move the rectangle out of the collision
                    if(noOverlap) r1.x = r1.x + overlapX;
                }
                else{
                    collisionSide = "right";
                    //Move the rectangle out of the collision
                    if(noOverlap) r1.x = r1.x - overlapX;
                }

                //Bounce
                if(bounce) r1.vx *= -1;
            }
        }
        else{
            //No collision
            collisionSide = "none";
        }
    }
    else
    {
    //No collision
    collisionSide = "none";
    }
    return collisionSide;
}
