const gulp = require('gulp'),
    mocha = require('gulp-mocha');

const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
gulp.task('default', () => {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('validattila.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});


gulp.task('test',function(){
    return gulp.src('tests/*.js')
        .pipe(mocha());
    });