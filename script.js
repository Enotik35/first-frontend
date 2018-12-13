function texting() {
			let ipt = document.getElementById('input').value;
			var textElem = document.createElement('div');
			textElem.className = "msg "
			textElem.innerHTML = ipt;
			document.body.appendChild(textElem);
		}
		