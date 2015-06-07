document.addEventListener('DOMContentLoaded', function() {
	var links = document.getElementsByClassName('scroll');
	console.log(links);
	var i, length;

	/**
	 * Quadratic ease-in function.  This function can be found just by Googling.
	 * @param  {number} currentTime Amount of time passed
	 * @param  {number} startValue  Start position
	 * @param  {number} change      Current position of the window
	 * @param  {number} duration    Total time it takes to complete the scroll
	 * @return {number}             New location for scrollTop
	 */
	var quadEaseIn = function (currentTime, startValue, change, duration) {
		currentTime /= duration/2;
		if (currentTime < 1) return change/2 * currentTime * currentTime + currentTime;
		currentTime--;
		return -change/2 * (currentTime * (currentTime - 2) - 1) + currentTime;
	};

	/**
	 * smoothScroll function is attached to the anchors
	 * @param  {} e event
	 * @return {}   
	 */
	var smoothScroll = function(e) {
		e.preventDefault();
		var startTime;
		var currentPos;
		var startPos = document.body.scrollTop;
		// anchor href is matched to element with the same id without '#'.
		var id = e.target.href.split('#')[1];
		// Top position of the target element.
		var endPos = document.getElementById(id).getBoundingClientRect().top;
		var maxScroll = document.body.scrollHeight - window.innerHeight;
		var scrollEndValue = startPos + endPos < maxScroll ? endPos: maxScroll - startPos;
		// Time it takes to reach the target element.
		// It is set to endPos.  Takes shorter time to reach closer elements.
		var duration = endPos;
		var scroll = function(timestamp) {
			startTime = startTime || timestamp;
			currentPos = document.body.scrollTop;
			var elapsedTime = timestamp - startTime;
			// Updates scroll position
			document.body.scrollTop = quadEaseIn(elapsedTime, startPos, scrollEndValue, duration);
			elapsedTime < duration && requestAnimationFrame(scroll);
		}
		requestAnimationFrame(scroll);	
	}

	for (i = 0, len = links.length; i < len; i++) {
		links[i].addEventListener('click', smoothScroll);
	}
})