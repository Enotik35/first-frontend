'use strict'

function auth(username,password, callback){
	const xhr = new XMLHttpRequest();
	xhr.open('POST','/auth',true);
	xhr.withCredentials = true;

	const user = {username,password};
	const body = JSON.stringify(user);

	xhr.setRequestHeader('Content-Type','application/json; charset=utf8');

	xhr.onreadystattechange = function () {
		if(xhr.readyState !== 4) return;
		if(+xhr.status !== 200) {
			return callback(xhr,null);
		}
		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};
xhr.send(body);
}


const sections = [
	['login','Окно логина'],
	['profile','Мой профиль'],
	['chat','Глобальный чат'],
	['about','О нас']
];

const application = document.querySelector('#application');
const nav = document.getElementById('navig');

for(let section of sections) {
	const button = document.createElement('input');
	button.setAttribute('type','button');
	button.setAttribute('data-section', section[0]);
	button.setAttribute('class','but');
	button.value = section[1];
	nav.appendChild(button);
};

const liveSectionsCollection = application.getElementsByTagName('section');

nav.addEventListener('click', function(event) {
	const sectionId = event.target.getAttribute('data-section');
	console.log(sectionId);
	console.log(liveSectionsCollection);

	const liveSectionsArray = Array.from(liveSectionsCollection);

	liveSectionsArray.forEach(function(sectionElement) {
		sectionElement.hidden = true;
		if(sectionElement.id === sectionId){
			sectionElement.hidden = false;
		}
	})

});

const chat = document.getElementById('chat');

function texting() {
			let ipt = document.getElementById('input').value;
			var textElem = document.createElement('div');
			textElem.className = "msg "
			textElem.innerHTML = ipt;
			chat.appendChild(textElem);
};

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit',function(event){
	event.preventDefault();
	console.log(loginForm.elements);
	const email = loginForm.elements['email'].value;
	const username = loginForm.elements['username'].value;

	auth(username,email, function(err,resp) {
		console.log(err,resp);
	})

	//emailDiv.textContent = email;
	//usernameDiv.textContent = username;
});