import {loadScript, loadCSS, DOMReady} from './helpers'

export function renderMath() {
	const content = document.body.innerText

	if(content.includes('$$') ||
		(content.includes('\\(') && content.includes('\\)')) ||
		(content.includes('\\[') && content.includes('\\]'))) {
			console.log('Loading Katex...')
			const proms = []
			loadCSS('https://cdn.jsdelivr.net/npm/katex@0.7.1/dist/katex.min.css')
			proms.push(loadScript('https://cdn.jsdelivr.net/npm/katex@0.7.1/dist/katex.min.js'))
			proms.push(loadScript('https://cdn.jsdelivr.net/npm/katex@0.7.1/dist/contrib/auto-render.min.js'))
			proms.push(DOMReady())
			Promise.all(proms).then(() => {
				console.log('Render Math...')
				renderMathInElement(document.body)
			})
		}
}

export default renderMath