var gulp = require("gulp"),
  ts = require("gulp-typescript"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

gulp.task("ts", function(){
  gulp.src(['src/ts-single/**/*.ts'])
  .pipe(ts())
  .pipe(gulp.dest('./dist/js'))
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += "-min"
  }))
  .pipe(gulp.dest('./dist/js'));

});
