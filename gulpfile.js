var gulp = require('gulp');
var typedoc = require('gulp-typedoc');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    return gulp
        .src('src/Demos/*/*Demo.tsx')
        .pipe(gulp.dest('public/demos'));
});

gulp.task('compile', function () {
    return gulp
        .src([
            'src/lib/**/*.tsx',
            '!src/**/*.test.tsx',
            'src/lib/**/*.ts',
            '!src/**/*.test.ts',
        ])
        .pipe(gulp.dest('dist'))
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task('doc', function (cb) {
    return gulp
        .src(["src/**/*.ts", "src/*.tsx"])
        .pipe(typedoc({
            module: "file",
            esModuleInterop: true,
            jsx: true,
            out: "docs/",
            name: "My project title"
        }))
    ;
});