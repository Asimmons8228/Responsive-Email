import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import shell from 'gulp-shell';


const sass = gulpSass(dartSass);
const reload = browserSync.reload;

gulp.task('webpack', function (){
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'webpack'
    ]))
    .pipe(browserSync.stream())
})

gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});


gulp.task('browser-sync', function (){
    browserSync.init({
        server: './public',
        notify: false,
        open: false,
    })
})

gulp.task('watch', function (){
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass', reload));
    // gulp.watch('./src/js/**/*', gulp.series('webpack', reload));
    gulp.watch('./public/*.html').on('change', reload);
});

gulp.task('sass:minify', function(){
    return gulp.src('./public/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
});

gulp.task('default', gulp.series(
  gulp.parallel('sass', 'browser-sync', 'watch')
));

gulp.task('production', gulp.series('sass:minify'));