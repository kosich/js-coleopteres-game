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
        gulp.start( [ 'webpack' ] );
    });
});

gulp.task('webpack', function() {
    return gulp.src( paths.src.editor )
        .pipe( $.sourcemaps.init() )
        .pipe($.webpack({ /* webpack configuration */ }))
        .pipe( $.rename('e.b.js') )
        .pipe( $.sourcemaps.write('.') )
        .pipe(gulp.dest('./'));
});

gulp.task( 'default', [ 'webpack', 'watch' ] );
