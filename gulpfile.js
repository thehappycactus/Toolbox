var gulp = require('gulp');

gulp.task('default', function() {
	
});

gulp.task('script', function () {

});

gulp.task('update', function () {
	gulp.src('node_modules/angular/angular.min.js').pipe(gulp.dest('js/lib'));
	gulp.src('node_modules/angular-resource/angular-resource.min.js').pipe(gulp.dest('js/lib'));
	gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('js/lib'));
	gulp.src('node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('js/lib'));
	gulp.src('node_modules/ladda/dist/ladda.min.js').pipe(gulp.dest('js/lib'));
	gulp.src('node_modules/ladda/dist/spin.min.js').pipe(gulp.dest('js/lib'));

	gulp.src('node_modules/bootstrap/dist/css/bootstrap-theme.min.css').pipe(gulp.dest('css'));
	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('css'));
	gulp.src('node_modules/ladda/dist/ladda-themeless.min.css').pipe(gulp.dest('css'));
});