let player = '';
let turn = 0;
let gameStart = 0;
let count = 0;

let container = document.createElement('div');
container.id = 'container';
document.body.prepend(container);

let gameArea = document.createElement('div');
gameArea.id = 'gameArea';
container.append(gameArea);

let scoreBoard = document.createElement('div');
scoreBoard.id = 'scoreBoard';
gameArea.append(scoreBoard);

let scoreTypes = ['player', 'computer'];
for(let i = 0; i < scoreTypes.length; i++){
	let scoreSection = document.createElement('div');
	scoreSection.className = 'scoreSection';
	gameArea.append(scoreSection);

	let scoreName = document.createElement('span');
	scoreName.className = 'scoreName';
	scoreName.innerText = scoreTypes[i];
	scoreSection.append(scoreName);

	let score = document.createElement('span');
	score.id = scoreTypes[i] + 'Score';
	score.className = 'score';
	score.innerText = '0';
	scoreSection.append(score);
}

let gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameArea.append(gameBoard);

let gameBoardContent = document.createElement('div');
gameBoardContent.id = 'gameBoardContent';
gameBoard.append(gameBoardContent);

let blocks = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let winCombos = [
	['one', 'two', 'three'],
	['four', 'five', 'six'],
	['seven', 'eight', 'nine'],
	['one', 'four', 'seven'],
	['two', 'five', 'eight'],
	['three', 'six', 'nine'],
	['one', 'five', 'nine'],
	['three', 'five', 'seven']
];

buildMenu();

function checkWin(){
	for(let i = 0; i < winCombos.length; i++){
		let currentCheck = '';
		let notificationText = '';
		for(let j = 0; j < winCombos[i].length; j++){
			currentCheck += document.getElementById(winCombos[i][j]).innerText;
		}
		if(currentCheck == 'XXX' || currentCheck == 'OOO'){
			gameStart = 0;
			count = 0;
			let winner = (currentCheck == 'XXX')? 'X' : 'O';
			if(winner == player){
				playerScore.innerText = parseInt(playerScore.innerText) + 1;
				notificationText = 'You won!';
			}else{
				computerScore.innerText = parseInt(computerScore.innerText) + 1;
				notificationText = 'You lost!';
			}
			showNotification(notificationText);
		}
		else if(count == 9){
			gameStart = 0;
			count = 0;
			notificationText = 'It\'s a draw!';
			showNotification(notificationText);
		}
	}
}

function showNotification(msg){
	let notification = document.createElement('div');
	notification.id = 'notification';
	notification.innerText = msg;
	gameBoard.append(notification);
	setTimeout(function(){
		notification.style.cssText = 'opacity:0';
	}, 1500);
	setTimeout(function(){
		notification.remove();
		gameRestart();
	}, 2250);
}

function fadeIn(el, time){
	el.style.cssText = 'opacity:1';
	setTimeout(function(){
		el.removeAttribute('style');
	}, time);
}

function buildMenu(){
	let menuSpan = document.createElement('div');
	menuSpan.id = 'menuSpan';
	menuSpan.innerText = 'What would you like to be?';
	gameBoardContent.append(menuSpan);

	let playerChoices = ['X', 'O'];
	for(let i = 0; i < playerChoices.length; i++){
		let menuOption = document.createElement('div');
		menuOption.id = playerChoices[i];
		menuOption.className = 'menuOption';
		menuOption.innerText = playerChoices[i];
		menuOption.addEventListener('click', function(){
			player = this.innerText;
			gameStart = 1;
			gameBoardContent.style.cssText = 'opacity:0';
			setTimeout(function(){
				gameBoardContent.innerHTML = '';
				buildBoard();
			}, 500);
		});
		gameBoardContent.append(menuOption);
	}
	fadeIn(gameBoardContent, 500);
}

function gameRestart(){
	count = 0;
	gameWrapper.remove();
	buildBoard();
	if(turn == 1){
		computerChoice();
	}
}

function buildBoard(){
	gameStart = 1;
	let gameWrapper = document.createElement('div');
	gameWrapper.id = 'gameWrapper';
	gameBoardContent.append(gameWrapper);

	for(let i = 0; i < blocks.length; i++){
		let block = document.createElement('div');
		block.id = blocks[i];
		block.addEventListener('click', function(){
			if(gameStart == 1 && turn == 0 && this.innerText == ''){
				turn = 1;
				let span = document.createElement('span');
				span.className = 'boardMark';
				span.innerText = player;
				this.append(span);
				count++;
				checkWin();
				computerChoice();
			}
		});
		gameWrapper.append(block);
	}
	fadeIn(gameBoardContent, 500);
}

function computerChoice(){
	let rand = Math.floor(Math.random() * blocks.length);
	let block = document.getElementById(blocks[rand]);
	if(gameStart == 1){
		if(block.innerText == ''){
			setTimeout(function(){
				turn = 0;
				let span = document.createElement('span');
				span.className = 'boardMark';
				span.innerText = (player == 'X')? 'O' : 'X';
				block.append(span);
				count++;
				checkWin();
			}, 1000);
		}else{
			computerChoice();
		}
	}
}