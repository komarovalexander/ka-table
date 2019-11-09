var gulp = require('gulp');
var typedoc = require('gulp-typedoc');

gulp.task('default', function () {
    return gulp
        .src('src/Demos/*/*Demo.tsx')
        .pipe(gulp.dest('public/demos'));
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