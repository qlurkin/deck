import {DOMReady} from './helpers'
import './deck.scss'

import './code.js'

import renderMath from './math'

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
let mode = ''

const touch = {}

function touchStart(event) {
	if(event.changedTouches.length == 1) {
		touch.x = event.changedTouches[0].clientX
		touch.y = event.changedTouches[0].clientY
	}
}

function touchEnd(event) {
	const v = {}
	if(event.changedTouches.length == 1) {
		v.x = event.changedTouches[0].clientX - touch.x
		v.y = event.changedTouches[0].clientY - touch.y

		if(Math.abs(v.x) > 4*Math.abs(v.y)) {
			if(v.x > 0) {
				previousSlide()
			}
			else {
				nextSlide()
			}
		}
	}
}

function addTouchNavigation() {
	document.addEventListener('touchstart', touchStart)
	document.addEventListener('touchend', touchEnd)
}

function removeTouchNavigation() {
	document.removeEventListener('touchstart', touchStart)
	document.removeEventListener('touchend', touchEnd)
}

function initNavigation() {
	document.addEventListener('keydown', event => {
		event.preventDefault()
		if (['ArrowRight', 'ArrowDown', 'KeyS', 'KeyD', 'Space'].includes(event.code)) {
			nextSlide()
		}
		else if(['ArrowLeft', 'ArrowUp', 'KeyW', 'KeyA'].includes(event.code)) {
			previousSlide()
		}
		else if (event.key === 'm') {
			toggleView()
		}
	})

	document.querySelector('h1').addEventListener('click', () => {
		toggleView()
	})

	window.addEventListener('orientationchange', event => {
		setModeBasedOnOrientation()
	})
}

function setClass(slideNumber, className) {
	const slide = document.getElementById('slide-'+slideNumber)
	if(slide.classList.contains(className)) return

	const classAttrib = slide.attributes["class"]
	if(classAttrib) {
		const classes = classAttrib.value
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

function setModeBasedOnOrientation() {
	if(screen.orientation.type.startsWith('portrait')) {
		documentMode()
	}
	else {
		deckMode()
	}
}

export function initDeck() {
	document.querySelector('meta[name="viewport"]').setAttribute('content', "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no")

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
	renderMath()
	initNavigation()
	setModeBasedOnOrientation()
}

export function currentSlide() {
	return current
}

export function getSlideCount() {
	return count
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

export function toggleView() {
	if(mode === 'document') {
		deckMode()
	}
	else {
		documentMode()
	}
}

export function documentMode() {
	document.body.classList.remove('mode-deck')
	document.body.classList.add('mode-document')
	mode = 'document'
	removeTouchNavigation()
}

export function deckMode() {
	document.body.classList.add('mode-deck')
	document.body.classList.remove('mode-document')
	mode = 'deck'
	addTouchNavigation()
}

DOMReady().then(() => {
	initDeck()
})