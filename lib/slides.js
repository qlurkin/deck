$(function () {
	$.deck('section');

	renderMathInElement(document.body, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "\\[", right: "\\]", display: true },
			{ left: "$", right: "$", display: false },
			{ left: "\\(", right: "\\)", display: false }
		]
	});

	$(document).bind('deck.change', function (event, from, to) {
		$('body').scrollTop(0);
	});

	$(document).keypress(function (event) {
		if (event.key === 'm') {
			$('body').toggleClass('mode-deck');
			$('body').toggleClass('mode-document');
		}
	});
});
