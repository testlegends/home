var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglifyJs = require('gulp-uglify');
var minifyCSS = require('gulp-cssmin');
var concat = require('gulp-concat');

var paths = {
	target: '.tmp/public',
	assets: [
		'assets/**',
		'!assets/js/angular/**/*.js',
		'!assets/styles/*.css'
	],
	assetsToWatch: [
		'assets/**',
		'!assets/js/vendor/**'
	]
};

var cssFiles = [
	'assets/styles/reset.css',
	'assets/styles/home.css',
	'assets/js/vendor/fullpage.js/jquery.fullPage.css'
];

gulp.task('uglifyJs', function () {
	rjs({
		baseUrl: "assets/js/angular",
		name: "Home",
		mainConfigFile: "assets/js/angular/Home.js",
		out: "home.min.js"
	})
	.pipe(uglifyJs())
	.pipe(gulp.dest(paths.target + '/js/angular'));
});

gulp.task('minifyCSS', function () {
	gulp.src(cssFiles)
		.pipe(concat('home.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.target + '/styles'));
});

gulp.task('compileAssets', function () {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.target));
});

gulp.task('watch', function () {
	gulp.watch(paths.assetsToWatch, ['uglifyJs', 'minifyCSS', 'compileAssets']);
});

gulp.task('default', ['uglifyJs', 'minifyCSS', 'compileAssets', 'watch']);
