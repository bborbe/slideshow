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
	document.onkeyup = slideKeyPress;
}

function slideAddNumbers(articles) {
	for (var i = 0; i < articles.length; ++i) {
		var numbers = articles[i].getElementsByClassName("number")
		for (var j = 0; j < numbers.length; ++j) {
			numbers[j].innerHTML = (i + 1) + " / " + articles.length;
		}
	}
}

function slideKeyPress(e) {
	e = e || window.event;
	var charCode = e.charCode || e.keyCode;
	if (charCode == 37) {
		slidePrevious();
	}
	if (charCode == 39) {
		slideNext();
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

function slideNext(articles) {
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
