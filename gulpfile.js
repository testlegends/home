var gulp = require('gulp');

var paths = {
	target: '.tmp/public',
	assets: 'assets/**',
	assetsToWatch: ['assets/**', '!assets/js/vendor/**']
};

gulp.task('compileAssets', function () {
	return gulp.src(paths.assets)
		.pipe(gulp.dest(paths.target));
});

gulp.task('watch', function () {
	gulp.watch(paths.assetsToWatch, ['compileAssets']);
});

gulp.task('default', ['compileAssets', 'watch']);
