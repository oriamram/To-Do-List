const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function copHtml() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}
function copImg() {
    return gulp.src('src/imgs/*')
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream());
}
function copScss() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}
function copTs() {
    return gulp.src('src/scripts/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/scss/*.scss', gulp.series(copScss));
    gulp.watch('src/*.html', gulp.series(copHtml)).on('change', browserSync.reload);
    gulp.watch('src/scripts/*.ts', gulp.series(copTs)).on('change', browserSync.reload);
}

gulp.task('default', gulp.series(copHtml, copImg, copScss, copTs, serve));