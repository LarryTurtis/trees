var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");
var babel = require("babelify");
var Server = require("karma").Server;

function compile(watch) {
  var bundler = browserify("./src/app.js", {
    debug: false,
    packageCache: {},
    cache: {},
    plugin: [watchify],
  }).transform(babel, {
    presets: ["es2015"],
    plugins: ["transform-decorators-legacy"],
  });
  bundler.on("log", function (msg) {
    console.log(msg);
  });

  function rebundle() {
    bundler
      .bundle()
      .on("error", function (err) {
        console.error(err);
        this.emit("end");
      })
      .pipe(source("build.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./build"));
  }

  if (watch) {
    bundler.on("update", function () {
      rebundle();
      console.log("-> bundling...");
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

function test(done) {
  new Server(
    {
      configFile: __dirname + "/karma.conf.js",
      autoWatch: true,
    },
    done
  ).start();
}

gulp.task("build", function () {
  return compile();
});
gulp.task("watch", function () {
  return watch();
});
gulp.task("test", test);

gulp.task("default", gulp.series("watch"));
