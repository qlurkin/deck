var gulp = require('gulp');
var pug = require('gulp-pug');
var inliner = require('gulp-inliner');

gulp.task('default', function(){
	return gulp.src('*.pug')
		.pipe(pug())
		.pipe(inliner({
			inlinemin: true,
			compressCSS: false,
			compressJS: false,
			collapseWhitespace: false,
			nosvg: true,
			preserveComments: true
		}))
		.pipe(gulp.dest('build'))
});

//gulp.watch('*.pug', ['default']);
//gulp.watch('lib/*', ['default']);
