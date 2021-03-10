import hljs from './highlight'
import {DOMReady} from './helpers'

import './code.scss'

function normalizeIndent(str) {
	// trim empty lines from start & end
	str = str.replace(/^\s?\n|\n\s?$/g, '');
 
	const lines = str.split('\n');
	const indentLen = /^\s*/.exec(lines[0])[0].length;
	return lines.map(l => l.slice(indentLen)).join('\n');
}

function normalizeAllIndent() {
	const codes = document.querySelectorAll('pre>code')
	codes.forEach(code => {
		code.innerHTML = normalizeIndent(code.innerHTML)
	})
}

DOMReady().then(() => {
	normalizeAllIndent()
	hljs.highlightAll()
})
