let container = document.createElement('div');
container.id = 'container';
document.body.prepend(container);

let header = document.createElement('header');
header.id = 'header';
container.append(header);

let h1 = document.createElement('h1');
h1.innerText = 'Local Weather App';
header.append(h1);

let content = document.createElement('div');
content.id = 'content';
container.append(content);

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function (position) {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		fetchJSON(lat, lon);
	});
}else{
	alert('Your browser does not support geolocation!');
}

function fetchJSON(lat, lon){
fetch('https://weather-proxy.freecodecamp.rocks/api/current?lat='+lat+'&lon='+lon)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		let celsius = data.main.temp;
		let fahrenheit = (celsius * 9/5) + 32;

		let locBlock = document.createElement('p');
		content.append(locBlock);

		let locCity = document.createElement('span');
		locCity.id = 'locCity';
		locCity.innerText = data.name;
		locBlock.append(locCity);

		let locCountry = document.createElement('span');
		locCountry.id = 'locCountry';
		locCountry.innerText = data.sys.country;
		locBlock.append(locCountry);

		let tempBlock = document.createElement('p');
		content.append(tempBlock);

		let temperature = document.createElement('span');
		temperature.id = 'temperature';
		temperature.innerText = celsius;
		tempBlock.append(temperature);

		let tempCF = document.createElement('span');
		tempCF.id = 'tempCF';
		tempCF.innerText = '°C';
		tempCF.addEventListener('click', function(){
			temperature.innerText = (tempCF.innerText == '°C')? fahrenheit : celsius;
			tempCF.innerText = (tempCF.innerText == '°C')? '°F' : '°C';
		});
		tempBlock.append(tempCF);

		let descBlock = document.createElement('p');
		content.append(descBlock);

		let desc = document.createElement('span');
		desc.id = 'desc';
		desc.innerText = data.weather[0].main;
		descBlock.append(desc);

		let iconBlock = document.createElement('p');
		content.append(iconBlock);

		let icon = document.createElement('img');
		icon.src = data.weather[0].icon;
		iconBlock.append(icon);
	})
	.catch(function(err){
		alert(err);
	});
}