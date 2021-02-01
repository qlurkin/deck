import './deck.css'
//import './lib/prism.css'
//import Prism from './lib/prism.js'
import { loadCSS, loadScript } from './helpers.js'

const loadPrism = () => {
	console.log('Load Prism.js')
	loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css')
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-core.min.js')
	.then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'))
	.then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js'))
	.then(() => {
		Prism.highlightAll()
	})
}

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css")
loadCSS("https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab")
loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons")
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

	//Prism.highlightAll()
	if(document.querySelectorAll('[class*=lang]').length > 0)
		loadPrism()

	function toggleView() {
		$('body').toggleClass('mode-deck')
		$('body').toggleClass('mode-document')
	}

	deckOk.then(() => {
		renderMathInElement(document.body)

		$.deck('section')
		
		$(document).bind('deck.change', function (event, from, to) {
			$('body').scrollTop(0);
		});
	
		$(document).keypress(function (event) {
			if (event.key === 'm') {
				toggleView()
			}
		});

		// const button = document.createElement("button")
		// button.innerHTML = '<i class="material-icons off">toggle_off</i><i class="material-icons on">toggle_on</i>'
		// button.classList.add("toggle-button")
		// document.body.appendChild(button)
		// button.addEventListener('click', () => {
		// 	toggleView()
		// 	button.blur()
		// })
	})
})
