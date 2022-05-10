function rot13(str) {
	let code = {
		A: 'N', B: 'O', C: 'P', D: 'Q', E: 'R', F: 'S', G: 'T', H: 'U', I: 'V', J: 'W',
		K: 'X', L: 'Y', M: 'Z', N: 'A', O: 'B', P: 'C', Q: 'D', R: 'E', S: 'F', T: 'G',
		U: 'H', V: 'I', W: 'J', X: 'K', Y: 'L', Z: 'M'
	}

	let decoded = '';
	for(let i = 0; i < str.length; i++){
		if(code[str[i]]){
			decoded += code[str[i]];
		}else{
			decoded += str[i];
		}
	}

	return decoded;
}