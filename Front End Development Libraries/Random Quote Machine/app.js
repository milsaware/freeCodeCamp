const quoteBox = document.getElementById('quote-box');
const quoteWrapper = document.getElementById('quote-wrapper');
const quote = document.getElementById('text');
const author = document.getElementById('author');
const socialWrapper = document.getElementById('social-wrapper');
const buttonWrapper = document.getElementById('button-wrapper');
const tweetQuote = document.getElementById('tweet-quote');
const newQuote = document.getElementById('new-quote');

let rand = Math.floor(Math.random() * 3);
let quotes = [];
window.addEventListener('resize', function(){
	loadQuote(rand);
});

loadQuote(rand);

function loadQuote(rando){
	quotes = [
		{
			quote: 'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
			author: 'Mark Twain',
			background: 'https://raw.githubusercontent.com/ozboware/freeCodeCamp/ozboware/Front%20End%20Development%20Libraries/Random%20Quote%20Machine/images/marktwain.jpg',
			quoteWrapperRight: (window.innerWidth <= 430)? '7px' : ((window.innerWidth <= 650)? '10px' : '8px'),
			quoteWrapperTop: (window.innerWidth <= 430)? '8px' : '14px',
			socialWrapperTop: '10px',
			socialWrapperLeft: '10px',
			buttonWrapperRight: (window.innerWidth <= 430)? '246px' : ((window.innerWidth <= 650)? '74px' : '50px'),
			buttonWrapperBottom: (window.innerWidth <= 430)? '34px' : ((window.innerWidth <= 650)? '9px' : '76px')
		},
		{
			quote: 'Those who dare to fail miserably can achieve greatly.',
			author: 'John F. Kennedy',
			background: 'https://raw.githubusercontent.com/ozboware/freeCodeCamp/ozboware/Front%20End%20Development%20Libraries/Random%20Quote%20Machine/images/jfk.jpg',
			quoteWrapperRight: (window.innerWidth <= 430)? '187px' : ((window.innerWidth <= 650)? '230px' : '349px'),
			quoteWrapperTop: (window.innerWidth <= 650)? '13px' : '49px',
			socialWrapperTop: 'calc(100% - 48px)',
			socialWrapperLeft: '10px',
			buttonWrapperRight: (window.innerWidth <= 430)? '184px' : ((window.innerWidth <= 650)? '203px' : '380px'),
			buttonWrapperBottom: (window.innerWidth <= 650)? '14px' : '76px'
		},
		{
			quote: 'Have no fear of perfection, you\'ll never reach it.',
			author: 'Salvador Dali',
			background: 'https://raw.githubusercontent.com/ozboware/freeCodeCamp/ozboware/Front%20End%20Development%20Libraries/Random%20Quote%20Machine/images/salvadordali.jpg',
			quoteWrapperRight: (window.innerWidth <= 430)? '13px' : '50px',
			quoteWrapperTop: (window.innerWidth <= 650)? '34px' : '66px',
			socialWrapperTop: '10px',
			socialWrapperLeft: 'calc(100% - 48px)',
			buttonWrapperRight: (window.innerWidth <= 430)? '33px' : '50px',
			buttonWrapperBottom: (window.innerWidth <= 430)? '17px' : ((window.innerWidth <= 650)? '27px' : '76px')
		}
	];

	quoteBox.style.background = 'url('+quotes[rando].background+')';
	quoteBox.style.backgroundSize = 'cover';

	quoteWrapper.style.position = quotes[rando].quoteWrapperPosition;
	quoteWrapper.style.right = quotes[rando].quoteWrapperRight;
	quoteWrapper.style.top = quotes[rando].quoteWrapperTop;

	quote.innerText = quotes[rando].quote;
	author.innerText = quotes[rando].author;

	socialWrapper.style.top = quotes[rando].socialWrapperTop;
	socialWrapper.style.left = quotes[rando].socialWrapperLeft;

	buttonWrapper.style.right = quotes[rando].buttonWrapperRight;
	buttonWrapper.style.bottom = quotes[rando].buttonWrapperBottom;

	tweetQuote.href = 'https://twitter.com/intent/tweet?hashtags=quotes&related=ozboware&via=ozboware&text=' + encodeURI(quotes[rando].quote + ' - '+ quotes[rando].author + '.');

	newQuote.removeEventListener("click", btnClick);
	newQuote.addEventListener('click', btnClick);
}

function btnClick() {
	rand = (rand == (quotes.length - 1))? 0 : rand + 1;
	loadQuote(rand);
}
