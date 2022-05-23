let timerRunning = 0;
let sessionTimer = 1500000;
let breakTimer = 300000;
let sessionIncrement = document.getElementById('session-increment');
let sessionDecrement = document.getElementById('session-decrement');
let sessionLength = document.getElementById('session-length');
let breakIncrement = document.getElementById('break-increment');
let breakDecrement = document.getElementById('break-decrement');
let breakLength = document.getElementById('break-length');
let timerLabel = document.getElementById('timer-label');
let timeLeft = document.getElementById('time-left');
let startStop = document.getElementById('start_stop');
let resetBtn = document.getElementById('reset');
let audio = document.getElementById('beep');
let interval;

function timerConvert(ms) {
	let minutes = Math.floor(ms / 60000);
	let seconds = ((ms % 60000) / 1000).toFixed(0);
	let mins = (minutes < 10)? '0' + minutes : minutes;
	return (seconds == 60)? (mins + 1) + ':00' : mins + ':' + ((seconds < 10)? '0' : '') + seconds;
}

sessionIncrement.addEventListener('click', function(){
	if(sessionLength.innerText != '60' && timerRunning == 0){
		sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
		sessionTimer = parseInt(sessionLength.innerText) * 60 * 1000;
		if(timerLabel.innerText == 'Session'){
			timeLeft.innerText = timerConvert(sessionTimer);
		}
	}
});

sessionDecrement.addEventListener('click', function(){
	if(sessionLength.innerText != '1' && timerRunning == 0){
		sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
		sessionTimer = parseInt(sessionLength.innerText) * 60 * 1000;
		if(timerLabel.innerText == 'Session'){
			timeLeft.innerText = timerConvert(sessionTimer);
		}
	}
});

breakIncrement.addEventListener('click', function(){
	if(breakLength.innerText != '60' && timerRunning == 0){
		breakLength.innerText = parseInt(breakLength.innerText) + 1;
		breakTimer = parseInt(breakLength.innerText) * 60 * 1000;
		if(timerLabel.innerText == 'Break'){
			timeLeft.innerText = timerConvert(breakTimer);
		}
	}
});

breakDecrement.addEventListener('click', function(){
	if(breakLength.innerText != '1' && timerRunning == 0){
		breakLength.innerText = parseInt(breakLength.innerText) - 1;
		breakTimer = parseInt(breakLength.innerText) * 60 * 1000;
		if(timerLabel.innerText == 'Break'){
			timeLeft.innerText = timerConvert(breakTimer);
		}
	}
});

function countDown(){
	if(timerRunning == 1){
		if(timerLabel.innerText == 'Session'){
			sessionTimer = sessionTimer - 1000;
		}else{
			breakTimer = breakTimer - 1000;
		}
		let timeLeftIn = (timerLabel.innerText == 'Session')? sessionTimer : breakTimer;
		if(timeLeftIn == 0){
			audio.play();
		}
		if(timeLeftIn < 0){
			if(timerLabel.innerText == 'Session'){
				sessionTimer = parseInt(sessionLength.innerText) * 60 * 1000;
			}else{
				breakTimer = parseInt(breakLength.innerText) * 60 * 1000;
			}
			timerLabel.innerText = (timerLabel.innerText == 'Session')? 'Break' : 'Session';
			timeLeft.innerText = (timerLabel.innerText == 'Session')? timerConvert(sessionTimer) : timerConvert(breakTimer);
		}else{
			timeLeft.innerText = timerConvert(timeLeftIn);
		}
	}else{
		clearInterval(interval);
	}
}

startStop.addEventListener('click', function(){
	if(this.className == 'fa fa-play player-btn'){
		timerRunning = 1;
		this.className = 'fa fa-pause player-btn';
		interval = setInterval(function() {
			countDown();
		}, 1000);
	}else{
		timerRunning = 0;
		this.className = 'fa fa-play player-btn';
		clearInterval(interval);
	}
});

resetBtn.addEventListener('click', function(){
	clearInterval(interval);
	audio.pause();
	audio.currentTime = 0;
	timerRunning = 0;
	startStop.className = 'fa fa-play player-btn';
	sessionTimer = 1500000;
	breakTimer = 300000;
	sessionLength.innerText = 25;
	breakLength.innerText = 5;
	timerLabel.innerText = 'Session';
	timeLeft.innerText = '25:00';
});