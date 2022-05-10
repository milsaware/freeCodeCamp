function telephoneCheck(str) {
	if(str.replace(/[^\d]/g, '').length < 10){
		return false;
	}

	if((str.includes('(') && !str.includes(')')) || (str.includes(')') && !str.includes('('))){
		return false;
	}
	
	return(str.match(/^['1']['-\s\.']?\(?(\d{3})\)?[-\s\.]?(\d{3})[-\s\.]?(\d{4})$/g) || str.match(/^\(?(\d{3})\)?[-\s\.]?(\d{3})[-\s\.]?(\d{4})$/g))? true : false;
}
