import gulp from 'gulp';

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');

const paths = {
    'pug': './assets/pug/',
    'twcss': './assets/css',
    'html': './dist/',
    'css': './dist/'
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
    );
};

// Tailwind CSS
const twcssBuild = () => {
    return gulp.src([
        paths.twcss + '**/*.css'
    ])
    .pipe(
        postcss([
            require('tailwindcss'),
            require('autoprefixer')
        ])
    )
    .pipe(
        gulp.dest(paths.css)
    );
};

// 自動コンパイル
const liveCompile = () => {
    gulp.watch(paths.pug + '**/*.pug')
    .on('change', gulp.series(pugCompile));

    gulp.watch(paths.twcss + '**/*.css')
    .on('change', gulp.series(twcssBuild));
}

gulp.task('default', gulp.parallel(pugCompile, twcssBuild));
gulp.task('live', liveCompile);