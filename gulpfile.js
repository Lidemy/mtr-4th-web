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
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const glob = require('glob');
const es = require('event-stream');

const base = {
  src: 'src',
  dest: 'public',
  ghPage: 'build',
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
  return del([
    base.dest,
    `${base.ghPage}/*`,
    `!${base.ghPage}/.git`,
    `!${base.ghPage}/.gitignore`,
  ]);
}

const js = (done) => {
  glob('./src/js/bundle/*.js', function (err, files) {
    if (err) done(err);

    files.push('src/js/index.js');
    var tasks = files.map(function (entry) {
      return browserify({
        entries: [entry],
        debug: true,
        transform: [babelify.configure(),]
      })
        .bundle()
        .pipe(source(entry.match(/[^\\/]+$/)[0]))
        .pipe(rename({
          extname: '.bundle.js'
        }))
        .pipe(gulp.dest(paths.js.dest));
    });
    es.merge(tasks).on('end', done)
      .pipe(connect.reload());
  })
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

function font() {
  return src(`${base.src}/webfonts/*`)
    .pipe(dest(`${base.dest}/webfonts`))
}

function img() {
  return src(paths.image.src)
    .pipe(imageMin())
    .pipe(dest(paths.image.dest))
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

function make() {
  return src(`${base.dest}/**/*`)
    .pipe(dest(base.ghPage))
}

const resource = gulp.parallel(html, css, js, img, font)
const build = gulp.series(clean, resource, gulp.parallel(watch, server))

exports.clean = clean;
exports.default = build;
exports.make = gulp.series(clean, resource, make);