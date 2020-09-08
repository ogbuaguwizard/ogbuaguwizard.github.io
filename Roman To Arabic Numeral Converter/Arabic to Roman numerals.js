
let inpm = document.getElementById("inpm");
let inpd = document.getElementById("inpd");
let inpc = document.getElementById("inpc");
let inpl = document.getElementById("inpl");
let inpx = document.getElementById("inpx");
let inpv = document.getElementById("inpv");
let inpi = document.getElementById("inpi");
let convert = document.getElementById("convert");
let output = document.getElementById("output");
let clear = document.getElementById("clear");


let inputArray =[];
let outputArray ;


inpm.onclick = function() {
	if(isNaN(output.textContent)){
		output.textContent+="M";
	}
	else{
		inputArray.length= 0;
   		output.textContent="M";
	}
	 	inputArray.push(1000);
}

inpd.onclick = function() {
	if(isNaN(output.textContent)){
		output.textContent+="D";
	}
	else{
		inputArray.length= 0;
   		output.textContent="D";
	}
	 	inputArray.push(500);
}

inpc.onclick = function() {
	if(isNaN(output.textContent)){
		output.textContent+="C";
	}
	else{
		inputArray.length= 0;
   		output.textContent="C";
	}
	 	inputArray.push(100);
}

inpl.onclick = function() {
	if(isNaN(output.textContent)){	 
		output.textContent+="L";
	}
	else{
		inputArray.length= 0;
   		output.textContent="L";
	}
	 	inputArray.push(50);
}

inpx.onclick = function() {
	if(isNaN(output.textContent)){	 
		output.textContent+="X";
	}
	else{
		inputArray.length= 0;
  		output.textContent="X";
	}
	 	inputArray.push(10);
}

inpv.onclick = function() {
	if(isNaN(output.textContent)){	 
		output.textContent+="V";
	}
	else{
		inputArray.length= 0;
  		output.textContent="V";
	}
		inputArray.push(5);
}

inpi.onclick = function() {
	if(isNaN(output.textContent)){	 
	output.textContent+="I";
	}
	else{
		inputArray.length= 0;
   		output.textContent="I";
	}
	 	inputArray.push(1);
}




clear.onclick = function() {
	inputArray.length=0;
	output.textContent="";
	[inpm,inpd,inpc,inpl,inpx,inpv,inpi].forEach(function(value,index,arr){
		value.disabled = false;
		value.setAttribute('class','inp');
	});
}


convert.onclick = function() {
  outputArray = [0];
	
	if(output.textContent==""){
		alert("enter a value");
	}
	else{
		for(let i=0; i < inputArray.length; i++){
			if(outputArray[outputArray.length-1] < inputArray[i]){
				let realValue = inputArray[i]-outputArray[outputArray.length-1];
				outputArray.push(realValue);
			}
			else{
				outputArray.push(inputArray[i]);
			}
		}


		let finalOutput = [];

		for(let i=1; i< outputArray.length; i++){
			if(outputArray[i] < outputArray[i+1]){
			//do nothing	
			}
			else{
				finalOutput.push(outputArray[i]);
			} 
		}
		output.textContent= finalOutput.reduce(function(a,b){  return a+b;});
		[inpm,inpd,inpc,inpl,inpx,inpv,inpi].forEach(function(value,index,arr){
			value.disabled = false;
			value.setAttribute('class','inp');
		});
	}

}



window.addEventListener('click',disable,false);

function disable(){
	if(output.textContent.length >= 10){
		[inpm,inpd,inpc,inpl,inpx,inpv,inpi].forEach(function(value,index,arr){
			let classAttr = value.getAttribute('class') + ' disabled'
			value.disabled = true;
			value.setAttribute('class',classAttr);
		});
	}
}