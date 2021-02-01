export const loadScript = url => new Promise(resolve => {
	const script = document.createElement('script')
	const callback = () => {
		resolve()
	}
	script.onload = callback
	script.onreadystatechange = callback;
	
	script.setAttribute("src", url)
	document.head.insertBefore(script , null)
})

export const loadCSS = url => new Promise(resolve => {
	const link = document.createElement('link')
	link.onload = () => {
		resolve()
	}
	link.setAttribute("rel", "stylesheet")
	link.setAttribute("href", url)
	document.head.insertBefore(link , null)
})