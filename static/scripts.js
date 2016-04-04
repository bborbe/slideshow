var PM_TOUCH_SENSITIVITY = 15;

if (window.attachEvent) {
	window.attachEvent('onload', slideInit);
} else {
	if (window.onload) {
		var curronload = window.onload;
		var newonload = function () {
			curronload();
			slideInit();
		};
		window.onload = newonload;
	} else {
		window.onload = slideInit;
	}
}

function slideGetCurrentPosition() {
	return parseInt(document.location.hash.substr(1)) - 1 || 0
}

function slideSetCurrentPosition(pos) {
	document.location.hash = (pos + 1)
}

function slideInit() {
	var articles = document.getElementsByTagName("article")
	slideAddClasses(articles);
	slideAddNumbers(articles);
	document.body.addEventListener('touchstart', slideHandleTouchStart, false);
	document.onkeyup = slideKeyPress;
}

function slideHandleTouchStart(event) {
	if (event.touches.length == 1) {
		touchDX = 0;
		touchDY = 0;

		touchStartX = event.touches[0].pageX;
		touchStartY = event.touches[0].pageY;

		document.body.addEventListener('touchmove', slideHandleTouchMove, true);
		document.body.addEventListener('touchend', slideHandleTouchEnd, true);
	}
}

function slideHandleTouchMove(event) {
	if (event.touches.length > 1) {
		slideCancelTouch();
	} else {
		touchDX = event.touches[0].pageX - touchStartX;
		touchDY = event.touches[0].pageY - touchStartY;
	}
}

function slideHandleTouchEnd(event) {
	var dx = Math.abs(touchDX);
	var dy = Math.abs(touchDY);

	if ((dx > PM_TOUCH_SENSITIVITY) && (dy < (dx * 2 / 3))) {
		if (touchDX > 0) {
			slidePrevious();
		} else {
			slideNext();
		}
	}

	slideCancelTouch();
}

function slideCancelTouch() {
	document.body.removeEventListener('touchmove', slideHandleTouchMove, true);
	document.body.removeEventListener('touchend', slideHandleTouchEnd, true);
}

function slideAddNumbers(articles) {
	for (var i = 0; i < articles.length; ++i) {
		var numbers = articles[i].getElementsByClassName("number")
		for (var j = 0; j < numbers.length; ++j) {
			numbers[j].innerHTML = (i + 1) + " / " + articles.length;
		}
	}
}

function slideKeyPress(event) {
	event = event || window.event;
	var charCode = event.charCode || event.keyCode;
	if (charCode == 37) {
		slidePrevious();
		event.preventDefault();
	}
	if (charCode == 39) {
		slideNext();
		event.preventDefault();
	}
}

function slidePrevious() {
	if (slideGetCurrentPosition() > 0) {
		var articles = document.getElementsByTagName("article")
		slideRemoveClasses(articles);
		slideSetCurrentPosition(slideGetCurrentPosition() - 1);
		slideAddClasses(articles);
	}
}

function slideNext() {
	var articles = document.getElementsByTagName("article")
	if (slideGetCurrentPosition() < articles.length - 1) {
		slideRemoveClasses(articles);
		slideSetCurrentPosition(slideGetCurrentPosition() + 1);
		slideAddClasses(articles);
	}
}

function slideAddClasses(articles) {
	slideAddClass(articles, -2, "far-past")
	slideAddClass(articles, -1, "past")
	slideAddClass(articles, 0, "current")
	slideAddClass(articles, 1, "next")
	slideAddClass(articles, 2, "far-next")
}

function slideRemoveClasses(articles) {
	slideRemoveClass(articles, -2, "far-past")
	slideRemoveClass(articles, -1, "past")
	slideRemoveClass(articles, 0, "current")
	slideRemoveClass(articles, 1, "next")
	slideRemoveClass(articles, 2, "far-next")
}

function slideAddClass(articles, offset, className) {
	var pos = slideGetCurrentPosition() + offset;
	if (pos >= 0 && pos < articles.length) {
		articles[pos].classList.add(className);
	}
}

function slideRemoveClass(articles, offset, className) {
	var pos = slideGetCurrentPosition() + offset;
	if (pos >= 0 && pos < articles.length) {
		articles[pos].classList.remove(className);
	}
}

function log(message) {
	window.console && console.log && console.log(message);
}