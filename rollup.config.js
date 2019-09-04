import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'

export default [
	{
		input: 'deck.js',
		output: {
			file: 'dist/deck.js',
			format: 'iife'
		},
		plugins: [ 
			resolve(),
			babel({
				exclude: 'node_modules/**'
			}),
			postcss({
				plugins: []
			})
		]
	}
]