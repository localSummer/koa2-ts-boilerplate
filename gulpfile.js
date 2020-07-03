/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const { series, watch } = require('gulp');
const tsProject = ts.createProject('tsconfig.json');

function cleanDist(cb) {
  gulp.src('dist').pipe(clean());
  cb();
}

function build(cb) {
  tsProject
    .src()
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  cb();
}

function dev() {
  const compile = () => {
    tsProject
      .src()
      .pipe(tsProject())
      .pipe(gulp.dest('dist'));
  };
  compile();
  watch(
    ['src/**/*.ts'],
    {
      delay: 200
    },
    function(cb) {
      // body omitted
      compile();
      cb();
    }
  );
}

exports.dev = dev;

exports.build = series(cleanDist, build);
