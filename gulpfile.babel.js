import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import assign from 'lodash.assign';

import cssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import lost from 'lost';
import mqpacker from 'css-mqpacker';
import cssMixins from 'postcss-mixins';
import cssNested from 'postcss-nested';
import cssFor from 'postcss-for';
import cssSimpleVars from 'postcss-simple-vars';

const $ = gulpLoadPlugins();
const bs = browserSync.create();
const postcssPlugins = [
  cssImport({
    from: './src/css/app.css'
  }),
  cssMixins,
  cssFor,
  cssSimpleVars,
  cssNested,
  lost(),
  mqpacker,
  autoprefixer({ browsers: ['last 2 versions'] })
];

const paths = {
  src: './src/',
  build: './build/'
};

function errorHandler(err) {
  gutil.log(gutil.colors.red(err.toString()));
  this.emit('end');
}

function buildScript(watch) {
  const props = assign({}, watchify.args, {
    entries: [paths.src + 'js/App.js'],
    debug: true,
    extensions: ['.js']
  });

  const bundler = watch ? watchify(browserify(props), {
    ignoreWatch: true
  }) : browserify(props);

  bundler.transform(babelify);

  function rebundle() {
    return bundler.bundle()
      .on('error', errorHandler)
      .pipe(source('app.js'))
      // Uglify when building, not on development
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.if(!watch, $.uglify()))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.build));
  }

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log);
  bundler.on('error', errorHandler);
  return rebundle();
}

gulp.task('styles', () => {
  return gulp.src(paths.src + 'css/app.css')
    .pipe($.plumber({ errorHandler }))
    .pipe($.sourcemaps.init())
    .pipe($.postcss(postcssPlugins))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build))
    .pipe(bs.stream());
});

gulp.task('html', () => {
  return gulp.src(paths.src + '*.html')
    .pipe(gulp.dest(paths.build));
});

gulp.task('build-watch', ['html', 'styles'], () => {
  return buildScript(true);
});

gulp.task('build-no-watch', ['html', 'styles'], () => {
  return buildScript(false);
});

gulp.task('build', ['build-no-watch']);

gulp.task('watch', ['build-watch'], () => {
  bs.init({
    server: {
      baseDir: paths.build
    }
  });

  gulp.watch(paths.src + '*.html', ['html']);
  gulp.watch(paths.src + 'css/**/*.css', ['styles']);

  $.watch([
    paths.build + '**/*.js',
    paths.build + '**/*.html'
  ], bs.reload);
});

gulp.task('default', ['watch']);
