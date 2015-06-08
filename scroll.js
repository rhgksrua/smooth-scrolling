document.addEventListener('DOMContentLoaded', function() {
	var links = document.getElementsByClassName('scroll');
	var i, length;

	/**
	 * Cubic ease-in function.  This function can be found just by Googling.
	 * @param  {number} t Amount of time passed
	 * @param  {number} b Start position
	 * @param  {number} c Current position of the window
	 * @param  {number} d Total time it takes to complete the scroll
	 * @return {number}   New location for scrollTop
	 */
	var easeInOutCubic = function(t, b, c, d) {
	 	if ((t/=d/2) < 1) return c/2*t*t*t + b
	 		return c/2*((t-=2)*t*t + 2) + b
	} 

	/**
	 * smoothScroll function is attached to the anchors
	 * @param  {} e event
	 * @return {}   
	 */
	var smoothScroll = function(e) {
		e.preventDefault();
		var startTime;
		var startPos = document.body.scrollTop;
		// anchor href is matched to element with the same id without '#'.
		var id = e.target.href.split('#')[1];
		// Top position of the target element.
		var endPos = document.getElementById(id).getBoundingClientRect().top;
		var maxScroll = document.body.scrollHeight - window.innerHeight;
		var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
		//var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
		// Time it takes to reach the target element.
		// It is set to endPos.  Takes shorter time to reach closer elements.
		var duration = 900;
		var scroll = function(timestamp) {
			startTime = startTime || timestamp;
			//startPos = document.body.scrollTop;
			var elapsedTime = timestamp - startTime;
			// Updates scroll position
			document.body.scrollTop = easeInOutCubic(elapsedTime, startPos, scrollEndValue, duration);
			elapsedTime < duration && requestAnimationFrame(scroll);
		}
		requestAnimationFrame(scroll);	
	}

	for (i = 0, len = links.length; i < len; i++) {
		links[i].addEventListener('click', smoothScroll);
	}
})