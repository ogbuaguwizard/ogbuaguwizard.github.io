
export default class InputHandler{
    constructor(object,cntrDirection){
            this.cntrDirection = cntrDirection;
                     
            let touchHandler = () => {
                object.stop("x");
                object.stop("y");
                switch(this.cntrDirection){
                    case "N":
                        if(object.moveForward) object.moveForward();
                        break; 
                    case "NE":
                        if(object.moveForward) object.moveForward();
                        if(object.moveRight) object.moveRight();	
                        break;
                    case "NW":
                        if(object.moveForward) object.moveForward();
                        if(object.moveLeft) object.moveLeft();
                        break;
                    case "S":
                        if(object.moveBackward) object.moveBackward();
                        break;
                    case "SE":
                        if(object.moveBackward) object.moveBackward();
                        if(object.moveRight) object.moveRight();
                        break; 
                    case "SW":
                        if(object.moveBackward) object.moveBackward();
                        if(object.moveLeft) object.moveLeft();
                        break;
                    case "W":
                        if(object.moveLeft) object.moveLeft();
                        break;
                    case "E":
                        if(object.moveRight) object.moveRight();
                        break;
                    case "C":
                        object.stop("x");
                        object.stop("y");
                }
            }
             
                     
            let touchendHandler = () => {
                this.cntrDirection = "C";
                object.stop("x");
                object.stop("y");
            }
  
            
            let keydownHandler = (event) => {
                switch(event.keyCode){
                    case 37:
                        if(object.moveLeft) object.moveLeft();
                        break;
                    case 38:
                        if(object.moveForward) object.moveForward();
                        break;
                    case 39:
                        if(object.moveRight) object.moveRight();
                        break;
                    case 40:
                        if(object.moveBackward) object.moveBackward();
                        break;
                }
            }
  
            
            let keyupHandler = (event) =>{
                switch(event.keyCode){
                    case 37:
                        if(object.vx < 0) object.stop('x');
                        break;
                    case 38:
                        if(object.vx < 0) object.stop('y');
                        break;
                    case 39:
                        if(object.vx > 0) object.stop('x');
                        break;
                    case 40:
                        if(object.vx > 0) object.stop('y');
                        break;
                }
            }
  
            window.addEventListener("touchmove", touchHandler,false);
            window.addEventListener("touchend", touchendHandler,false); 
            window.addEventListener("mousemove", touchHandler,false);
            window.addEventListener("mouseup",touchendHandler,false);
            window.addEventListener("keyup", keyupHandler,false);
            window.addEventListener("keydown", keydownHandler,false);
  
    }
    update(cntrDirection){
      this.cntrDirection = cntrDirection;
    }
  }