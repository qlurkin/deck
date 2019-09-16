import './deck.css'
import './lib/prism.css'
import Prism from './lib/prism.js'
import { loadCSS, loadScript } from './helpers.js'

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css")
loadCSS("https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab")
loadCSS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css")

const scripts = []

scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"))
scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"))
scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"))
scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js"))

const deckOk = Promise.all(scripts).then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/deck.js/1.1.0/core/deck.core.js"))

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	
	document.body.classList.add('mode-document')

	Prism.highlightAll()

	deckOk.then(() => {
		renderMathInElement(document.body)

		$.deck('section')
		
		$(document).bind('deck.change', function (event, from, to) {
			$('body').scrollTop(0);
		});
	
		$(document).keypress(function (event) {
			if (event.key === 'm') {
				$('body').toggleClass('mode-deck');
				$('body').toggleClass('mode-document');
			}
		});
	})
})
