#!/usr/bin/env node

const inliner = require('inliner')
const pug = require('pug')
const fs = require('fs')
const path = require('path')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')

if(process.argv.length < 3) {
	const example = fs.readFileSync(path.join(__dirname, 'example.pug'), 'utf8')
	console.log(`Usage:\n\tbuildDeck <deckFile.pug>\n\nExample:\n${example}`)
	process.exit()
}

// generate random directory name that doesn't exist
let lib
while(true) {
	lib = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	if(!fs.existsSync(lib)) break
}

const src = `extends ${lib}/layout.pug\n${fs.readFileSync(process.argv[2], 'utf8')}`

ncp(path.join(__dirname, 'lib'), lib, (err) => {
	if(err) {
		console.log(err)
		return
	}

	const html = pug.render(src, {pretty: true, filename: process.argv[2], lib})

	new inliner(html, {
		inlinemin: true,
		compressCSS: false,
		compressJS: false,
		collapseWhitespace: false,
		nosvg: true,
		preserveComments: true
	}, (err, result) => {
		rimraf.sync(lib)
		console.log(result)
	})
})


