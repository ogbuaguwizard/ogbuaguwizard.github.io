import collide from "./collision.js";

export default class InputHandler{
    constructor(object,cntrDirection){
            this.cntrDirection = cntrDirection;
            this.map = {};
                     
            let touchHandler = () => {
                if(object.stop) object.stop("x");
                if(object.stop) object.stop("y");
                switch(this.cntrDirection){
                    case "N":
                        if(object.climbUpward) object.climbUpward();
                        break; 
                    case "NE":
                        if(object.climbUpward) object.climbUpward();
                        if(object.moveForward) object.moveForward();	
                        break;
                    case "NW":
                        if(object.climbUpward) object.climbUpward();
                        if(object.moveBackward) object.moveBackward();
                        break;
                    case "S":
                        if(object.climbDownward) object.climbDownward();
                        break;
                    case "SE":
                        if(object.climbDownward) object.climbDownward();
                        if(object.moveForward) object.moveForward();
                        break; 
                    case "SW":
                        if(object.climbDownward) object.climbDownward();
                        if(object.moveBackward) object.moveBackward();
                        break;
                    case "W":
                        if(object.moveBackward) object.moveBackward();
                        break;
                    case "E":
                        if(object.moveForward) object.moveForward();
                        break;
                    case "C":
                        if(object.stop) object.stop("x");
                        if(object.stop) object.stop("y");
                }
            }
             
                     
            let touchendHandler = () => {
                this.cntrDirection = "C";
                if(object.stop) object.stop("x");
                if(object.stop) object.stop("y");
            }
  
            
            // let keydownHandler = (event) => {
            //     switch(event.keyCode){
            //         case 37:
            //             if(object.moveBackward) object.moveBackward();
            //             break;
            //         case 38:
            //             //if(collide(object,ladder).collisionType = "pixel") {
            //             //    if(object.climbUpward) object.climbUpward();
            //             //}
            //             //else{
            //                 if(object.shouldJump != undefined && !event.repeat) object.shouldJump = true;
            //             //}
            //             break;
            //         case 39:
            //             if(object.moveForward) object.moveForward();
            //             break;
            //         case 40:
            //             if(object.climbDownward) object.climbDownward();
            //             break;
            //         case 32:
            //             if(object.attack) object.attack();
            //             break;
            //     }
            // }
  
            
            // let keyupHandler = (event) =>{
            //     switch(event.keyCode){
            //         case 37:
            //             if(object.stop) object.stop('x');
            //             break;
            //         case 38:
            //             if(object.stop) object.stop('y');
            //             break;
            //         case 39:
            //             if(object.stop) object.stop('x');
            //             break;
            //         case 40:
            //             if(object.stop) object.stop('y');
            //             break;
            //     }
            // }
  



             let keyupHandler = (event) =>{
                this.map[event.keyCode]= false;

                if(!object.isAttacking ){
                    if(!this.map[37] && !this.map[39]){ // 
                        object.stop('x');
                        object.idle();
                    }
                }
                
            
                // if(!object.attackMode){
                    
                    // object.stop('y');
                    // if(!object.moving) {
                    //     
                    //     
                    // }
                // } 
            }

            let keydownHandler = (event) => {
                this.map[event.keyCode]= (event.type == 'keydown');

                
                if(this.map[37] && !this.map[39]){ // backward only
                    if(this.map[88]){ // if x(run)  is pressed
                        if(this.map[38]) (!event.repeat) ? object.run('backward',true) : object.run('backward');  //if jump 
                        else object.run('backward');
                    }
                    else if(this.map[38]){
                        (!event.repeat) ? object.jump('backward') : object.moveBackward();
                    }
                    else if(this.map[32] && !event.repeat){ 
                        object.attack();
                    }
                    else{
                        object.moveBackward();
                    }
                }
                else if(this.map[39] && !this.map[37]){ //forward only
                    if(this.map[88]){ // if x(run)  is pressed
                        if(this.map[38]) (!event.repeat) ? object.run('forward',true) : object.run('forward');  //if jump 
                        else object.run('forward');
                    }
                    else if(this.map[38] && (!event.repeat)){
                            object.jump('forward');
                            this.map[38] = false;
                    }
                    else if(this.map[32] && !event.repeat){ 
                        object.stop('x');
                        object.attack();
                        this.map[32] = false;
                    }
                    else{
                        if(!object.isAttacking) object.moveForward();
                    }
                }
                else{
                    if(this.map[38]){ // keyup only
                        if(!event.repeat){
                            object.jump('up');
                            this.map[38] = false;
                        }
                        else{
                            object.stop('x');
                            if(!object.isAttacking && !object.inAir) object.idle();
                        }
                    }
                    else if(this.map[32] && !event.repeat){ 
                        object.stop('x');
                        object.attack();
                        this.map[32] = false;
                    }
                    else{
                        object.stop('x');
                        if(!object.isAttacking && !object.inAir) object.idle();
                    }
                }
            }
            // window.addEventListener("touchmove", touchHandler,false);
            // window.addEventListener("touchend", touchendHandler,false); 
            // window.addEventListener("mousemove", touchHandler,false);
            // window.addEventListener("mouseup",touchendHandler,false);
            window.addEventListener("keyup", keydownHandler,false);
            window.addEventListener("keydown", keydownHandler,false);
    }
    update(cntrDirection){
      this.cntrDirection = cntrDirection;
    }
  }