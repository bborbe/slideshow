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

function getSlideCurrent() {
	return parseInt(location.hash.substr(1)) || 0
}

function setSlideCurrent(pos) {
	location.hash = pos
}

function slideInit() {
	var articles = document.getElementsByTagName("article")
	slideAddClasses(articles);
	document.onkeyup = slideKeyPress;
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
	if (getSlideCurrent() > 0) {
		var articles = document.getElementsByTagName("article")
		slideRemoveClasses(articles);
		setSlideCurrent(getSlideCurrent() - 1);
		slideAddClasses(articles);
	}
}

function slideNext(articles) {
	var articles = document.getElementsByTagName("article")
	if (getSlideCurrent() < articles.length - 1) {
		slideRemoveClasses(articles);
		setSlideCurrent(getSlideCurrent() + 1);
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
	var pos = getSlideCurrent() + offset;
	if (pos >= 0 && pos < articles.length) {
		articles[pos].classList.add(className);
	}
}

function slideRemoveClass(articles, offset, className) {
	var pos = getSlideCurrent() + offset;
	if (pos >= 0 && pos < articles.length) {
		articles[pos].classList.remove(className);
	}
}

function log(message) {
	window.console && console.log && console.log(message);
}