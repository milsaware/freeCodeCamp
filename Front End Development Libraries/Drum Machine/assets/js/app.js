let drumMachine = document.createElement('div');
drumMachine.id = 'drum-machine';

let display = document.createElement('div');
display.id = 'display';
drumMachine.append(display);

let drumPadWrapper = document.createElement('div');
drumPadWrapper.id = 'drum-pad-wrapper';

let pads = [
	{
		key: 'Q',
		id: 'Heat-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
	},
	{
		key: 'W',
		id: 'Heat-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
	},
	{
		key: 'E',
		id: 'Heat-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
	},
	{
		key: 'A',
		id: 'Heat-4',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
	},
	{
		key: 'S',
		id: 'Clap',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
	},
	{
		key: 'D',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
	},
	{
		key: 'Z',
		id: 'Kick-n-Hat',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
	},
	{
		key: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
	},
	{
		key: 'C',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
	}
];
for(i = 0; i < pads.length; i++){
	let j = i;
	let drumPad = document.createElement('div');
	drumPad.id = pads[i].id;
	drumPad.className = 'drum-pad';
	let drumPadText = document.createElement('span');
	drumPadText.className = 'drum-pad-text';
	drumPadText.innerText = pads[i].key;
	drumPad.append(drumPadText);
	let clip = document.createElement('audio');
	clip.id = pads[i].key;
	clip.className = 'clip';
	clip.src = pads[i].url;
	drumPad.append(clip);
	drumPad.onclick = function(){
		clip.play();
		display.innerText = pads[j].id.replace('-', ' ');
	}
	document.addEventListener('keydown', function(event) {
		if(event.code == 'Key' + pads[j].key) {
			clip.play();
			display.innerText = pads[j].id.replace(/-/g, ' ');
		}
	});
	drumPadWrapper.append(drumPad);
}
drumMachine.append(drumPadWrapper);
document.body.appendChild(drumMachine);