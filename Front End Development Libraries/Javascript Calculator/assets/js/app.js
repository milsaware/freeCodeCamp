const operator = ['clear', 'divide', 'multiply', 'subtract', 'add', 'equals'];
const num = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal'];
const keyboard = operator.concat(num);
const displaySmall = document.getElementById('display-small');
const display = document.getElementById('display');

let answer = 0;
let calc = '';
let lastKey = '';

for(let i = 0; i < keyboard.length; i++){
	document.getElementById(keyboard[i]).addEventListener('click', function(){
		if(num.includes(keyboard[i])){
			if(answer != 0){
				answer = 0;
				calc = '';
				displaySmall.innerText = 0;
				display.innerText = 0;
			}
			if(keyboard[i] == 'decimal'){
				if(!display.innerText.includes(this.innerText)){
					console.log('decimal');
					calc += this.innerText;
					display.innerText = display.innerText + this.innerText;
				}
				return;
			}
			if(display.innerText == 0){
				if(this.innerText != 0){
					calc += this.innerText;
					display.innerText = this.innerText;
				}else{
					if(calc != ''){
						calc += this.innerText;
					}
				}
			}else{
				calc += this.innerText;
				display.innerText += this.innerText;
			}

			lastKey = 'number';
		}

		if(operator.includes(keyboard[i])){
			if(keyboard[i] == 'clear'){
				answer = 0;
				calc = '';
				displaySmall.innerText = 0;
				display.innerText = answer;
				return;
			}
			if(keyboard[i] == 'equals'){
				calc = (lastKey == 'number')? calc : calc.slice(0, -3);
				answer = Function('"use strict";return (' + calc + ')')();
				displaySmall.innerText = calc + ' = ' + answer;
				display.innerText = answer;
				lastKey = 'equals';
			}
			else{
				if(lastKey == 'number' || lastKey == 'equals'){
					if(display.innerText == 0){
						if(keyboard[i] != 'subtract'){
							calc = (lastKey == 'subtractPlus')? calc.slice(0, -3) + this.innerText + ' ' : calc.slice(0, -2) + this.innerText + ' ';
							displaySmall.innerText = calc;
							lastKey = 'subtractPlus';
							return;
						}else{
							if(lastKey != 'subtract' && lastKey != 'subtractPlus'){
								
								calc = calc.slice(0, -1) + this.innerText + ' ';
								displaySmall.innerText = calc;
								lastKey = 'subtractPlus';
								return;
							}
						}
					}else{
						if(answer != 0){
							calc = answer + ' ' + this.innerText + ' ';
							displaySmall.innerText = calc;
							display.innerText = 0;
							answer = 0;
						}
						else{
							calc += ' ' + this.innerText + ' ';
							displaySmall.innerText = calc;
							display.innerText = 0;
						}
						lastKey = keyboard[i];
					}
				}else{
					if(keyboard[i] != 'subtract'){
						calc = (lastKey != 'subtractPlus')? calc.slice(0, -2) + this.innerText + ' ' : calc.slice(0, -4) + this.innerText + ' ';
						lastKey = keyboard[i];
					}else{
						if(lastKey != 'subtract'){
							calc += this.innerText + ' ';
							lastKey = 'subtractPlus';
						}
					}
					displaySmall.innerText = calc;
				}
			}
		}
		
		
	});
}