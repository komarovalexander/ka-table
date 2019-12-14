var gulp = require('gulp');
var file = require('gulp-file');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var jsonfile = require('jsonfile')
var ghPages = require('gulp-gh-pages');
var replace = require('gulp-replace');

gulp.task('gh-pages', function () {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});

gulp.task('demos', function () {
    return gulp
        .src('src/Demos/*/*Demo.tsx')
        .pipe(replace('../../lib', 'ka-table'))
        .pipe(gulp.dest('public/demos'))
        .pipe(gulp.dest('build/demos'));
});

gulp.task('build', function () {
    return gulp
        .src([
            'src/lib/**/*.tsx',
            '!src/**/*.test.tsx',
            'src/lib/**/*.ts',
            '!src/**/*.test.ts',
        ])
        .pipe(gulp.dest('dist'))
        .pipe(tsProject())
        .pipe(gulp.dest('dist'))
        .on('end', () => {
            var pkg = require('./package.json');
            delete pkg.devDependencies;
            delete pkg.husky;
            delete pkg.jest;
            var outputFile = 'dist/package.json';
            file(outputFile, '');
            jsonfile.writeFile('dist/package.json', pkg, { spaces: 2 });
            gulp
                .src([
                    'README.md',
                    'LICENSE',
                ])
                .pipe(gulp.dest('dist'))
        });
});
