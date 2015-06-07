document.addEventListener('DOMContentLoaded', function() {
	var links = document.getElementsByClassName('scroll');
	console.log(links);
	var i, length;

	var smoothScroll = function(e) {
		e.preventDefault();
		var startTime;
		var currentPos;
		var startPos = document.body.scrollTop;
		var id = e.target.href.split('#')[1];
		var endPos = document.getElementById(id).getBoundingClientRect().top;
		var maxScroll = document.body.scrollHeight - window.innerHeight;
		var scrollEndValue = startPos + endPos < maxScroll ? endPos: maxScroll - startPos;
		var duration = 900;
		var scroll = function(timestamp) {
			startTime = startTime || timestamp;
			currentPos = document.body.scrollTop;

			var elapsedTime = timestamp - startTime;
			document.body.scrollTop = document.body.scrollTop + 10;
			console.log(currentPos, endPos);
			if (elapsedTime > duration) {
				return false;
			}
			currentPos < endPos && requestAnimationFrame(scroll);
		}
		requestAnimationFrame(scroll);


		
		
	}

	for (i = 0, len = links.length; i < len; i++) {
		links[i].addEventListener('click', smoothScroll);
	}
})