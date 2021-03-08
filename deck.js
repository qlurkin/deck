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

function initNavigation() {
	document.addEventListener('keydown', event => {
		event.preventDefault()
		console.log('code:', event.code)
		if (['ArrowRight', 'ArrowDown', 'KeyS', 'KeyD', 'Space'].includes(event.code)) {
			nextSlide()
		}
		else if(['ArrowLeft', 'ArrowUp', 'KeyW', 'KeyA'].includes(event.code)) {
			previousSlide()
		}
	})
}

function setClass(slideNumber, className) {
	const slide = document.getElementById('slide-'+slideNumber)
	if(slide.classList.contains(className)) return

	const classAttrib = slide.attributes["class"]
	console.log(classAttrib)
	if(classAttrib) {
		const classes = classAttrib.value
		console.log(classes)
		const deckClasses = classes.match(/deck-.+/)
		if(deckClasses) {
			for(let cl of deckClasses) {
				slide.classList.remove(cl)
			}
		}
	}

	slide.classList.add(className)
}

function setClasses() {
	for(let i=1; i <= count; i++) {
		if(i < current-1) {
			setClass(i, 'deck-before')
		}
		else if(i == current-1) {
			setClass(i, 'deck-previous')
		}
		else if(i == current) {
			setClass(i, 'deck-current')
		}
		else if(i == current+1) {
			setClass(i, 'deck-next')
		}
		else {
			setClass(i, 'deck-after')
		}
	}
}

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
		i++
	})

	count = slides.length

	setClasses()
	initNavigation()

	document.body.classList.add('mode-deck')
}

export function currentSlide() {
	return current
}

export function getSlideCount() {
	return count
}

function transformElement(selector, className, newClass) {
	const previous = document.querySelector(selector)
	if(!previous) {
		console.log('Nothing', selector)
		return
	}
	previous.classList.remove(className)
	previous.classList.add(newClass)
}

export function nextSlide() {
	setCurrent(current+1)
}

export function previousSlide() {
	setCurrent(current-1)
}

export function setCurrent(i) {
	if(i < 1) i = 1
	if(i > count) i = count
	if(i == current) return
	current = i
	setClasses()
	setHash('slide-'+i)
}

document.addEventListener('DOMContentLoaded', () => {
	initDeck()
})