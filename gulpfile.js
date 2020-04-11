const gulp = require('gulp');
const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const imageMin = require('gulp-imagemin');
const del = require('del')
const babel = require('gulp-babel');

const base = {
  src: 'src',
  dest: 'public',
}
const paths = {
  css: {
    src: `${base.src}/scss/*.scss`,
    dest: `${base.dest}/css`,
  },
  js: {
    src: `${base.src}/js/**/*.js`,
    dest: `${base.dest}/js`,
  },
  html: {
    src: `${base.src}/html/*.pug`,
    dest: base.dest,
  },
  image: {
    src: `${base.src}/image/*`,
    dest: `${base.dest}/image`,
  }
};

function clean() {
  return del([base.dest]);
}

function html() {
  return src(paths.html.src)
    .pipe(pug())
    .pipe(dest(base.dest))
    .pipe(connect.reload())
}

function css() {
  const processors = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
  ];
  return src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(dest(paths.css.dest))
    .pipe(connect.reload())
}

function img() {
  return src(paths.image.src)
    .pipe(imageMin())
    .pipe(dest(paths.image.dest))
    .pipe(connect.reload())
}

function js() {
  return src(paths.js.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(dest(paths.js.dest, { sourcemaps: true }))
    .pipe(connect.reload())
}

function watch() {
  gulp.watch(`${base.src}/scss/**/*`, css);
  gulp.watch(`${base.src}/html/**/*`, html);
  gulp.watch(`${base.src}/js/**/*`, js);
  gulp.watch(`${base.src}/image/*`, img);
}

function server() {
  var options = {
    port: 8080,
    livereload: true,
  };
  connect.server(options);
};

const resource = gulp.parallel(html, css, js, img)
const build = gulp.series(clean, resource, gulp.parallel(watch, server))

exports.clean = clean;
exports.default = build;