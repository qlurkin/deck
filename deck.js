import './deck.scss'

import './code.js'

function setHash(str) {
	if(history.pushState) {
		history.pushState(null, null, '#'+str)
	}
	else {
		window.location.hash = '#'+str
	}
}

let count = 0
let current = 0

export function initDeck() {
	current = 1
	if(window.location.hash.length > 0 && window.location.hash.startsWith('#slide-')) {
		current = parseInt(window.location.hash.slice('#slide-'.length), 10)
	}
	else {
		setHash('slide-'+current)
	}
	
	const slides = document.querySelectorAll('body>section')
	
	let i = 1
	slides.forEach(slide => {
		
		slide.id = 'slide-'+i
		if(i < current-1) {
			slide.classList.add('deck-before')
		}
		else if(i == current-1) {
			slide.classList.add('deck-previous')
		}
		else if(i == current) {
			slide.classList.add('deck-current')
		}
		else if(i == current+1) {
			slide.classList.add('deck-next')
		}
		else {
			slide.classList.add('deck-after')
		}
		i++
	})

	count = i - 1
}

export function currentSlide() {
	return current
}

export function getSlideCount() {
	return count
}

function transformElement(selector, className, newClass) {
	const previous = document.querySelector(selector)
	previous.classList.remove(className)
	previous.classList.add(newClass)
}

export function nextSlide() {
	transformElement('.deck-previous', 'deck-previous', 'deck-before')
	transformElement('.deck-current', 'deck-current', 'deck-previous')
	transformElement('.deck-next', 'deck-next', 'deck-current')
	transformElement('.deck-after', 'deck-after', 'deck-next')
}

export function previousSlide() {
	transformElement('.deck-next', 'deck-next', 'deck-after')
	transformElement('.deck-current', 'deck-current', 'deck-next')
	transformElement('.deck-previous', 'deck-previous', 'deck-current')
	transformElement('.deck-before:last-of-type', 'deck-before', 'deck-previous')
}

document.addEventListener('DOMContentLoaded', () => {
	initDeck()
})