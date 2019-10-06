var gulp = require('gulp');
 
gulp.task('default', function () {
    return gulp.src('src/Demos/BasicDemo/BasicDemo.tsx')
        .pipe(gulp.dest('public/demos'));
});