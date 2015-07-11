'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var paths = {
    src : {
        editor : 'app/editor/main.js'
    },
    watch : {
        js : 'app/**/*.js'
    }
};

gulp.task('watch', function() {
    return $.watch( paths.watch.js, function(){
        gulp.start( [ 'build' ] );
    });
});

gulp.task('build', function() {
    return gulp.src( paths.src.editor )
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.sourcemaps.init())
        .pipe($.webpack(
            require( './webpack.config.js' )
        ))
        .pipe( $.sourcemaps.write('.') )
        .pipe(gulp.dest('./'));
});

gulp.task( 'default', [ 'build', 'watch' ] );
