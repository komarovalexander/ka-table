var gulp = require('gulp');
var file = require('gulp-file');

var jsonfile = require('jsonfile')
var replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));


gulp.task('demos', function () {
    return gulp
        .src('src/Demos/*/*Demo.tsx')
        .pipe(replace('../../lib', 'ka-table'))
        .pipe(gulp.dest('public/demos'))
        .pipe(gulp.dest('build/demos'));
});

gulp.task('compile', function () {
    return gulp
        .src([
            'README.md',
            'LICENSE',
        ])
        .pipe(gulp.dest('dist'))
        .on('end', () => {
            var pkg = require('./package.json');
            delete pkg.dependencies;
            delete pkg.devDependencies;
            delete pkg.scripts;
            delete pkg.husky;
            delete pkg.jest;
            delete pkg.browserslist;
            delete pkg.eslintConfig;
            var outputFile = 'dist/package.json';
            file(outputFile, '');
            jsonfile.writeFile('dist/package.json', pkg, { spaces: 2 });
            gulp
                .src([
                    'src/lib/**/*.scss'
                ])
                .pipe(gulp.dest('dist'))
                .on('end', () => {
                    gulp.src('dist/*.scss')
                        .pipe(sass().on('error', sass.logError))
                        .pipe(gulp.dest('dist'));
                });
            gulp
                .src([
                    'src/lib/static/*'
                ])
                .pipe(gulp.dest('dist/static'))
        });
});
