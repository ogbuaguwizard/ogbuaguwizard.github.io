
export default class InputHandler{
    constructor(object,cntrDirection){
            this.cntrDirection = cntrDirection;
            //this.touchmoveHandler = this.touchmoveHandler.bind(this)
                     
            let touchHandler = () => {
                object.stop("x");
                object.stop("y");
                switch(this.cntrDirection){
                    case "N":
                        object.moveForward();
                        break; 
                    case "NE":
                        object.moveForward();
                        object.moveRight();	
                        break;
                    case "NW":
                        object.moveForward();
                        object.moveLeft();
                        break;
                    case "S":
                        object.moveBackward();
                        break;
                    case "SE":
                        object.moveBackward();
                        object.moveRight();
                        break; 
                    case "SW":
                        object.moveBackward();
                        object.moveLeft();
                        break;
                    case "W":
                        object.moveLeft();
                        break;
                    case "E":
                        object.moveRight();
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
                        object.moveLeft();
                        break;
                    case 38:
                        object.moveForward();
                        break;
                    case 39:
                        object.moveRight();
                        break;
                    case 40:
                        object.moveBackward();
                        break;
                }
            }
  
            
            let keyupHandler = (event) =>{
                switch(event.keyCode){
                    case 37:
                        object.stop('x');
                        break;
                    case 38:
                        object.stop('y');
                        break;
                    case 39:
                        object.stop('x');
                        break;
                    case 40:
                        object.stop('y');
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