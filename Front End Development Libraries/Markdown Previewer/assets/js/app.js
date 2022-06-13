let convertedString = convertMarkdown('editor');
document.getElementById('preview').innerHTML = convertedString;

let textarea = document.getElementById('editor');
textarea.addEventListener('keyup', function(event) {
	let convertedString = convertMarkdown('editor');
	document.getElementById('preview').innerHTML = convertedString;
});