const gulp = require('gulp');
const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso');
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
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const svgSprite = require('gulp-svg-sprite');
const merge = require('merge-stream');
const gulpif = require('gulp-if');
const fontmin = require('gulp-fontmin-woff2');

// run minfont.js to get this string
const fontText = '\uf028\uf164\uf57d\uf1c0\uf7d9\uf233\uf201\uf3ed\uf126\uf51c\uf06e\uf0c9\uf35d\uf077\uf00c\uf2bd\uf061\uf063\uf062\uf073\uf550\uf14a\uf35a\uf0c5\uf30b\uf09b\uf082\uf23a\uf41b\uf3b8\uf13b\uf38b\uf268\uf457'
const env = process.env.NODE_ENV;

console.log('--- current mode: ', env);

const base = {
  src: 'src',
  dest: 'docs',
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
    src: `${base.src}/image/*.+(jpg|jpeg|gif|png|svg)`,
    dest: `${base.dest}/image`,
  }
};

function clean() {
  return del([
    `${base.dest}/*`,
    `!${base.dest}/.git`,
    `!${base.dest}/.gitignore`,
    `!${base.dest}/robots.txt`,
  ]);
}

const js = (done) => {
  glob('./src/js/bundle/*.js', function (err, files) {
    if (err) done(err);

    files.push('src/js/index.js');
    var tasks = files.map(function (entry) {
      return browserify({
        entries: [entry],
        debug: env === 'development',
        transform: [babelify.configure(),]
      })
        .bundle()
        .pipe(source(entry.match(/[^\\/]+$/)[0]))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(gulpif(env === 'development', sourcemaps.write()))
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

function sprite() {
  const config = {
    shape: {
      dimension: {
        maxWidth: 300,
        maxHeight: 300,
      },
      spacing: {
        padding: 2,
      },
    },
    mode: {
      view: {
        bust: false,
        example: true,
        layout: 'vertical',
        sprite: 'sprite.svg',
        render: {
          scss: { dest: '_sprite.scss' }
        }
      },
    }
  };
  return src('src/image/sprite/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('src/scss/sprite'));
}

function css() {
  const processors = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
  ];

  if (env === 'production') {
    processors.push(
      uncss({
        html: ['docs/*.html'],
      })
    )
  }
  const css = gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(minifyCSS())
    .pipe(gulpif(env === 'development', sourcemaps.write()))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(dest(paths.css.dest))
    .pipe(connect.reload())
  
  const copySprite = gulp.src('src/scss/sprite/view/*.svg')
    .pipe(gulp.dest('docs/css/'))

  return merge(css, copySprite);
}

function font() {
  return src(`${base.src}/webfonts/*.ttf`)
    .pipe(fontmin({
          text: fontText,
      }))
    .pipe(dest(`${base.dest}/webfonts`))
}

function img() {
  return src(paths.image.src)
    .pipe(imageMin())
    .pipe(dest(paths.image.dest))
    .pipe(connect.reload())
}

function beforeEnd() {
  return src(`${base.src}/statics/*`)
    .pipe(dest(`${base.dest}`))
}

function watch(done) {
  if (env !== 'production') {
    gulp.watch(`${base.src}/scss/**/*`, css);
    gulp.watch(`${base.src}/html/**/*`, html);
    gulp.watch(`${base.src}/js/**/*`, js);
    gulp.watch(`${base.src}/image/*`, img);
    gulp.watch(`${base.src}/image/*`, gulp.series(sprite, css));
  }
  done();
}

function server(done) {
  if (env !== 'production') {
    var options = {
      root: 'docs',
      port: 8080,
      livereload: true,
    };
    connect.server(options);
  }
  done();
};

const resource = gulp.series(js, gulp.parallel(html, css, img, font))
const build = gulp.series(clean, sprite, resource, beforeEnd, gulp.parallel(watch, server))

exports.clean = clean;
exports.default = build;
exports.js = js;
exports.css = css
exports.img = img
exports.beforeEnd = beforeEnd
exports.sprite = gulp.series(sprite, css);