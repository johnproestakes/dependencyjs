var gulp = require("gulp"),
  ts = require("gulp-typescript"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  connect = require("gulp-connect");

gulp.task("connect", function(){
  connect.server();
});

var minify = function(blob){
  console.log("minify");
  blob.pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += "-min"
  }))
  .pipe(gulp.dest('./dist/js'));
};


gulp.task("ts", function(){
  var blob = gulp.src(['src/ts-single/**/*.ts'])
  .pipe(ts())
  .pipe(gulp.dest('./dist/js'));

  minify(blob);


});



// gulp.task("watch", function(){
//   gulp.watch(['src/ts-single/**/*.ts'], ['ts'])
//
// }, ['ts','connect']);
