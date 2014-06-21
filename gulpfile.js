var gulp = require('gulp');

var paths = {
	target: '.tmp/public',
	assets: 'assets/**'
};

gulp.task('compileAssets', function () {
	return gulp.src(paths.assets)
		.pipe(gulp.dest(paths.target));
});

gulp.task('default', ['compileAssets']);

gulp.watch(paths.assets, ['default']);
