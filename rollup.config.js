import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sass from 'rollup-plugin-sass'


export default [
	{
		input: 'deck.js',
		output: {
			file: 'dist/deck.js',
			format: 'iife'
		},
		plugins: [ 
			resolve(),
			commonjs(),
			sass({
				insert: true
			})
		]
	}
]