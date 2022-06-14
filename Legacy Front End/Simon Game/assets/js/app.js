let currentPattern = [];
let gameStart = 0;
let ready = 0;
let currentGuess = 0;
let blinkTimer = 1150;
let gameStrict = 0;

let container = document.createElement('div');
container.id = 'container';
document.body.prepend(container);

let outerShell = document.createElement('div');
outerShell.id = 'outerShell';
container.append(outerShell);

let pads = [
	{
		padId: 'padOne',
		bright: 'background-color: #4646ff;',
		audio: './assets/audio/simonSound1.mp3'
	},
	{
		padId: 'padTwo',
		bright: 'background-color: #ff4848;',
		audio: './assets/audio/simonSound2.mp3'
	},
	{
		padId: 'padThree',
		bright: 'filter: brightness(1.6);',
		audio: './assets/audio/simonSound3.mp3'
	},
	{
		padId: 'padFour',
		bright: 'filter: brightness(1.6);',
		audio: './assets/audio/simonSound4.mp3'
	}
];

for(let i = 0; i < pads.length; i++){
	let pad = document.createElement('div');
	pad.className = 'pad';
	pad.id = pads[i].padId;
	pad.setAttribute('data-id', i + 1);
	pad.addEventListener('click', function(){
		if(ready == 1){
			if(pad.getAttribute('data-id') == currentPattern[currentGuess]){
				if(currentGuess == 19){
					displaySpan.innerText = '✔✔';
					gameReset();
				}else{
					currentGuess++;
					console.log(currentGuess)
					if(currentGuess >= currentPattern.length){
						currentGuess = 0;
						ready = 0;
						addNewChoice();
						setTimeout(function(){
							showPattern();
						}, 1500);
					}
				}
			}else{
				currentGuess = 0;
				ready = 0;
				currentDisplay = displaySpan.innerText;
				displaySpan.innerText = '!!';
				if(gameStrict == 0){
					setTimeout(function(){
						displaySpan.innerText = currentDisplay;
						showPattern();
					}, 1500);
				}else{
					gameReset();
				}
			}
		}
		this.getElementsByClassName('clip')[0].pause();
		this.getElementsByClassName('clip')[0].currentTime = 0;
		this.getElementsByClassName('clip')[0].play();
	});
	pad.addEventListener('mousedown', function(){
		this.style.cssText = pads[i].bright;
		removeBrightness(this);
	});
	outerShell.append(pad);

	let clip = document.createElement('audio');
	clip.className = 'clip';
	clip.src = pads[i].audio;
	pad.append(clip);
}

let verticalLine = document.createElement('div');
verticalLine.id = 'verticalLine';
outerShell.append(verticalLine);

let horizontalLine = document.createElement('div');
horizontalLine.id = 'horizontalLine';
outerShell.append(horizontalLine);

let innerShell = document.createElement('div');
innerShell.id = 'innerShell';
outerShell.append(innerShell);

let strictWrapper = document.createElement('div');
strictWrapper.id = 'strictWrapper';
innerShell.append(strictWrapper);

let strictSpan = document.createElement('span');
strictSpan.id = 'strictSpan';
strictSpan.innerText = 'strict mode';
strictWrapper.append(strictSpan);

let strictLight = document.createElement('div');
strictLight.id = 'strictLight';
strictLight.className = 'strictLightRed';
strictWrapper.append(strictLight);

let strictBtn = document.createElement('button');
strictBtn.id = 'strictBtn';
strictBtn.addEventListener('click', function(){
	if(gameStrict == 0){
		gameStrict = 1;
		strictLight.className = 'strictLightGreen';
	}else{
		gameStrict = 0;
		strictLight.className = 'strictLightRed';
	}
});
strictWrapper.append(strictBtn);

let display = document.createElement('div');
display.id = 'display';
innerShell.append(display);

let displaySpan = document.createElement('span');
displaySpan.id = 'displaySpan';
displaySpan.innerText = '00';
display.append(displaySpan);

let btnBar = document.createElement('div');
btnBar.id = 'btnBar';
innerShell.append(btnBar);

let startButton = document.createElement('button');
startButton.className = 'btn';
startButton.id = 'startButton';
startButton.innerHTML = '&#9654;';
startButton.addEventListener('click', function(){
	if(gameStart == 0){
		gameStart = 1;
		addNewChoice();
		ready = 0;
		showPattern();
	}
});
btnBar.append(startButton);

let resetButton = document.createElement('button');
resetButton.className = 'btn';
resetButton.id = 'resetButton';
resetButton.innerHTML = '&#9851;';
resetButton.addEventListener('click', function(){
	if(gameStart == 1){
		gameStart = 0;
		currentPattern = [];
		displaySpan.innerText = '00';
		blinkTimer = 1150;
	}
});
btnBar.append(resetButton);

function gameReset(){
	gameStart = 0;
	currentPattern = [];
	setTimeout(function(){
		displaySpan.innerText = '00';
		gameStart = 1;
		blinkTimer = 1150
		addNewChoice();
		showPattern();
	}, 1500);
}

function addNewChoice(){
	blinkTimer = blinkTimer - 50;
	let rand = Math.floor(Math.random() * 4 + 1);
	currentPattern.push(rand);
	displaySpan.innerText = (currentPattern.length < 10)? '0' + currentPattern.length : currentPattern.length;
}

function showPattern(){
	let j;
	let padsEl = document.getElementsByClassName('pad');
	for(let i = 0; i < currentPattern.length; i++){
		setTimeout(function(){
			for(let j = 0; j < padsEl.length; j++){
				if(padsEl[j].getAttribute('data-id') == currentPattern[i]){
					console.log('yep')
					padsEl[j].style.cssText = pads[j].bright;
					padsEl[j].querySelector('.clip').pause();
					padsEl[j].querySelector('.clip').currentTime = 0;
					padsEl[j].querySelector('.clip').play();
					setTimeout(function(){
						console.log('rem')
						padsEl[j].removeAttribute('style');
					}, blinkTimer - 100);
				}
			}
		}, blinkTimer * i);
		j = i;
	}
	setTimeout(function(){
		ready = 1;
	}, blinkTimer * (j + 1));
}

function removeBrightness(e){
	document.body.onmouseup = function() {
		e.removeAttribute('style');
	}
}