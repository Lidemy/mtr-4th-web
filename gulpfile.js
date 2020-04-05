const gulp = require('gulp');
const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

function html() {
  return src('src/html/*.pug')
    .pipe(pug())
    .pipe(dest('public'))
    .pipe(livereload())
}

function css() {
  return src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('public/css'))
    .pipe(livereload())
}

function js() {
  return src('src/**/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('public/js', { sourcemaps: true }))
}

function watchFiles() {
  livereload.listen(5500);
  gulp.watch("./src/scss/**/*", css);
  gulp.watch("./src/html/**/*", html);
}

const watch = gulp.parallel(watchFiles);
const build = gulp.series(watch, html, css, js);

exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.default = build;