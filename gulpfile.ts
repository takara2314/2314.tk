import gulp from 'gulp';

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');

const paths = {
    'pug': './assets/pug/',
    'html': './dist/'
};

// Pug → HTML
const pugCompile = () => {
    return gulp.src([
        paths.pug + '**/*.pug'
    ])
    .pipe(
        plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })
    )
    .pipe(
        pug({pretty: false})
    )
    .pipe(
        gulp.dest(paths.html)
    )
};

// 自動コンパイル
const liveCompile = () => {
    gulp.watch(paths.pug + '**/*.pug')
    .on('change', gulp.series(pugCompile));
}

gulp.task('default', gulp.parallel(pugCompile));
gulp.task('live', liveCompile);