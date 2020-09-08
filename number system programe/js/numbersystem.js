
//get elements and store in variables
//button , input and output
let convert= document.getElementById("convert");
let clear = document.getElementById('clear');
let output= document.getElementById("output");
let input= document.getElementById("input");
//base enterd by user
let decin= document.getElementById("decin");
let hexin= document.getElementById("hexin");
let octin= document.getElementById("octin");
let binin= document.getElementById("binin");
//base to output
let decout= document.getElementById("decout");
let hexout= document.getElementById("hexout");
let octout= document.getElementById("octout");
let binout= document.getElementById("binout");

            
  document.addEventListener("click", function(){
   if(decin.checked===true){ //what to do when the DEC is checked
         decout.checked = false;
         decout.disabled = true;
         hexout.disabled = false;
         octout.disabled = false;
         binout.disabled = false;
         input.type = "number";   
         input.placeholder = "Enter a value in Decimal";        
            // console.log("clicked"); just for testing and debugging
   }
   else if(hexin.checked===true){ //what to do when the HEX is checked
         decout.disabled = false;
         hexout.disabled = true;
         hexout.checked = false;
         octout.disabled = false;
         binout.disabled = false;
         input.type = "text";   
         input.placeholder = "Enter a value in Hexadecimal";        
   }
   else if(octin.checked===true){  //what to do when the OCT is checked
         decout.disabled = false;
         hexout.disabled = false;
         octout.disabled = true;
         octout.checked = false;
         binout.disabled = false;
         input.type = "number";   
         input.placeholder = "Enter a value in Octal";        
   }
   else if(binin.checked===true){  //what to do when the BIN is checked
         hexout.disabled = false;
         octout.disabled = false;
         decout.disabled = false;
         binout.disabled = true;
         binout.checked = false;
         input.type = "number";   
         input.placeholder = "Enter a value in Binary";        
   }
   else{
            //DO NOTHING WHEN OTHER PLACES ARE CLICKED
   }
});


convert.onclick = function(){ //when the convert button is clicked



            //validates to ensure that the buttons are checked
      if(((binin.checked!==true && hexin.checked!==true && decin.checked!==true && octin.checked!==true) ||
      (binout.checked!==true && octout.checked!==true &&   hexout.checked!==true && decout.checked!==true))){
                        //throw an error message 
             alert("please select how you want your convertion to be performed  and  make sure you input a value");
       }


/*------------------------------------------------------------------------------------------------------------*/


      else if(binin.checked==true){  // when the BIN is checked
          let inputArray =  input.value.split(""); //split the input and store as an array
          let newInput = "";

          for(i=0;i<inputArray.length;i++){  //iterate through the array
                if(parseInt(inputArray[i])!==0 && parseInt(inputArray[i])!==1){ 
                  //validate when ever the user enters a value that is not 0 or 1
                      alert("Please for Binary conversion,  enter only Binary values i.e 0's and 1's");
                      output.innerHTML = ""; //outputs nothing 
                      break; //break the loop on the first incorrect input found
                }
                else{
                        newInput+=inputArray[i]; 
                        if(octout.checked==true){
                              // when the OCT is checked for output, convert to Octal
                              output.innerHTML = parseInt(newInput, 2).toString(8);
                        }
                        else if(decout.checked==true){
                              // when the DEC is checked for output, convert to Decimal
                              output.innerHTML = parseInt(newInput, 2);
                        }
                        else if(hexout.checked==true){
                              // when the HEX is checked for output, convert to Hexadecimal
                              output.innerHTML = (parseInt(newInput, 2).toString(16)).toUpperCase();
                        }
                        else{//Do nothing
                        }
                  }
                // alert(inputArray[i]); just for testing and debugging purpose
            }
      }


/*------------------------------------------------------------------------------------------------------------*/




      else if(octin.checked==true){  // when the OCT is checked
            let inputArray =  input.value.split(""); //split the input and store as an array
            let newInput = "";

            for(i=0;i<inputArray.length;i++){  //iterate through the array
                  if(parseInt(inputArray[i])!==0 && parseInt(inputArray[i])!==1 &&
                     parseInt(inputArray[i])!==2 && parseInt(inputArray[i])!==3 &&
                     parseInt(inputArray[i])!==4 && parseInt(inputArray[i])!==5 &&
                     parseInt(inputArray[i])!==6 && parseInt(inputArray[i])!==7){ 
                        //validate when ever the user enters a value that is not above 7
                        alert("Please for Octal conversion,  enter only Octal values i.e 0 to 7");
                        output.innerHTML = ""; //outputs nothing 
                        break; //break the loop
                  }
                  else{ 
                        newInput+=inputArray[i]; 
                        if(binout.checked==true){
                                    // when the BIN is checked for output, convert to Binary
                                    output.innerHTML = parseInt( newInput, 8).toString(2);
                        }
                        else if(decout.checked==true){
                              // when the DEC is checked for output, convert to Decimal
                              output.innerHTML = parseInt( newInput, 8);
                        }
                        else if(hexout.checked==true){
                              // when the HEX is checked for output, convert to Hexadecimal
                              output.innerHTML = (parseInt( newInput, 8).toString(16)).toUpperCase();
                        }
                        else{//Do nothing
                        }
                  }
                 
            }
      }


/*------------------------------------------------------------------------------------------------------------*/



      else if(decin.checked==true){  // when the DEC is checked
           
                        if(binout.checked==true){
                                    // when the BIN is checked for output, convert to Binary
                                    output.innerHTML = parseInt(input.value, 10).toString(2);
                              }
                        else if(octout.checked==true){
                              // when the OCT is checked for output, convert to Octal
                              output.innerHTML = parseInt(input.value, 10).toString(8);
                        }
                        else if(hexout.checked==true){
                              // when the HEX is checked for output, convert to Hexadecimal
                              output.innerHTML = (parseInt(input.value, 10).toString(16)).toUpperCase();
                        }
                        else{//Do nothing
                        }
      }     
                  


/*------------------------------------------------------------------------------------------------------------*/



      else if(hexin.checked==true){  // when the HEX is checked
            let inputArray =  input.value.split(""); //split the input and store as an array
            let newInput = "";

            for(i=0;i<inputArray.length;i++){  //iterate through the array
                  if(parseInt(inputArray[i])!==0 && parseInt(inputArray[i])!==1 &&
                     parseInt(inputArray[i])!==2 && parseInt(inputArray[i])!==3 &&
                     parseInt(inputArray[i])!==4 && parseInt(inputArray[i])!==5 &&
                     parseInt(inputArray[i])!==6 && parseInt(inputArray[i])!==7 &&
                     parseInt(inputArray[i])!==8 && parseInt(inputArray[i])!==9 &&
                     inputArray[i]!=="A" && inputArray[i]!=="a" && 
                     inputArray[i]!=="B" && inputArray[i]!=="b" &&
                     inputArray[i]!=="C" && inputArray[i]!=="c" && 
                     inputArray[i]!=="D" && inputArray[i]!=="d" &&
                     inputArray[i]!=="E" && inputArray[i]!=="e" && 
                     inputArray[i]!=="F" && inputArray[i]!=="f"){
                        //validate when ever the user enters a value that is not above 0 to 9 // A to F
                        alert("Please for Hexadecimal conversion,  enter only HEX values i.e 0 to F");
                        output.innerHTML = ""; //outputs nothing 
                        break; //break the loop
                  }
                  else{ 
                        newInput+=inputArray[i]; 
                        if(binout.checked==true){
                                    // when the BIN is checked for output, convert to Binary
                                    output.innerHTML = parseInt( newInput, 16).toString(2);
                        }
                        else if(decout.checked==true){
                              // when the DEC is checked for output, convert to Decimal
                              output.innerHTML = parseInt( newInput, 16);
                        }
                        else if(octout.checked==true){
                              // when the OCT is checked for output, convert to Octal
                              output.innerHTML = parseInt( newInput, 16).toString(8);
                        }
                        else{//Do nothing
                        }
                  }
            
            }
      }
}

clear.onclick = function(){
      //reset everything

     [decout,hexout,octout,binout].forEach(function(value,index,arr){value.checked = false;});
     [decin,hexin,octin,binin].forEach(function(value,index,arr){value.checked = false;});
     [decout,hexout,octout,binout].forEach(function(value,index,arr){value.disabled = true;})
     
      input.value = "";
      output.innerHTML = "";
}