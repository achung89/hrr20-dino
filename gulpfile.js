const gulp = require('gulp');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babel-core/register');
const babelify = require('babelify');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const series = require('stream-series');
const gutil = require('gulp-util');
const nodePath = require('path');
const browserSync = require('browser-sync');


// The following NPM packages will be bundled into vendors.js or vendors.min.js,
// separate from custom code in app.js or app.min.js
const vendors = [
  'classnames',
  'keymirror',
  'flux',
  'axios',
  'react-router',
  'material-ui',
  'react-tap-event-plugin'
];

var path = {
  HTML: './client/index.html',
  SCSS: './client/**/*.scss',
  JS: './client/**/*.js',
  SPEC: './client/**/*.spec.js',
  OUT: './server/dist/build.js',
  DEST: './server/dist',
  DEST_BUILD: './server/dist/build',
  DEST_HTML: './server/dist/**/*.html',
  DEST_JS: './server/dist/build/*.js',
  DEST_JS_MIN: './server/dist/build/*.min.js',
  DEST_CSS: './server/dist/*.css',
  DEST_CSS_MIN: './server/dist/*.min.css',
  VENDOR: './server/dist/vendor/*.js',
  ENTRY_POINT: './client/app/app.js'
};

/*
    Build environment is determined by NODE_ENV:

    * The `gulp` command will build according to the NODE_ENV environment variable.
    * To build for production while NODE_ENV is *not* set to `development`,
        run `gulp production` explicitly. Note that NODE_ENV will be set
        to `production` anyway by Gulp in this case.
 */

gulp.task('default', ([process.env.NODE_ENV === 'production' ? 'production' : 'development']));


gulp.task('development', ['clean',
                          'build',
                          'copy',
                          'sass',
                          'watch']);


gulp.task('production',  ['apply-prod-environment',
                          'clean',
                          'copy',
                          'sass',
                          'build',
                          'lint',
                          'uglify',
                          'test']);

// This task allows you to run `gulp production` and still get the benefits of having NODE_ENV set to `production`.
// Some vendor packages like 'react' will deploy a production version when this environment variable is set.

gulp.task('apply-prod-environment', () => {
  return process.env.NODE_ENV = 'production';
});




gulp.task('clean', () => {

  if (process.env.NODE_ENV === 'production') {
    return gulp
      .src([`${path.DEST}/*.*`, path.DEST_BUILD, path.VENDOR])
      .pipe(clean());
  } else {
    return gulp
      .src([path.DEST_CSS_MIN, path.DEST_JS_MIN, path.VENDOR])
      .pipe(clean());
  }

});


gulp.task('copy', () => {
  return gulp
    .src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});


gulp.task('build', () => {
  var production = process.env.NODE_ENV === 'production';

  const vendorBundler = browserify({ debug: !production })
    .require(vendors);


  let bundler = browserify((path.ENTRY_POINT),
    {
      debug: !production,
      packageCache: {}
    })
    .require(require.resolve('./client/app/app.js'), { entry: true })
    .transform('babelify', {
      presets: ['es2015', 'react']
    })
    .external(vendors);

  let firstBuild = false;

  const rebundle = function() {
    bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('bundle.js'))
      .pipe(rename('app.js'))
      .pipe(gulpIf(production, streamify(uglify())))
      .pipe(gulpIf(production, rename('app.min.js')))
      .pipe(gulp.dest(path.DEST_BUILD))
      .on('end', () => {
        injectFileDependencies();

        if (firstBuild && !production) {
          startServer();
          firstBuild = false;

        } else {
          browserSync.reload();
        }
      });
  };

  vendorBundler.bundle()
    .pipe(source('vendor/vendor.js'))     // something going wrong with the injection of vendor.js into index.html
                                          // for now just hardcoding the script tag and not allowing it to be minified
    // .pipe(gulpIf(production, streamify(uglify())))
    // .pipe(gulpIf(production, rename('vendor/vendor.min.js')))
    .pipe(gulp.dest(path.DEST));

  if (!production) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      rebundle();
    });
  }

  return rebundle();
});


const injectFileDependencies = function() {
  let vendor = gulp.src('vendor/**/*.js', { read: false, cwd: nodePath.join(__dirname, path.DEST)});
  let app = gulp.src( ['*.css', 'build/**/*.js'], { read: false, cwd: nodePath.join(__dirname, path.DEST) });


  return gulp
    .src(path.HTML)
    .pipe(inject(series(vendor, app)))
    .pipe(gulp.dest((path.DEST)));
};


const startServer = function() {
  // browserSync.init({
  //   server: {
  //     baseDir: './server/dist'
  //   }
  // });
  const server = nodemon({
    script: 'server/server.js',
    watch: ['server/*.js', 'server/app/**/*.js']
  });

  let once = false;

  server.on('start', () => {
    if (!once) {
      browserSync.init({
        proxy: 'localhost:3000',
        port: 4000
      });
      once = true;
    }
  });

  return server;
};


gulp.task('watch', () => {
  gulp.watch(path.SCSS, ['sass']);
  gulp.watch(`${path.DEST_BUILD}/bundle.js`);
});


gulp.task('sass', () => {
  return gulp.src(path.SCSS)
    .pipe(concat('styles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf( process.env.NODE_ENV === 'production', cssmin()))
    .pipe(gulpIf( process.env.NODE_ENV === 'production', rename('styles.min.css')))
    .pipe(gulp.dest(path.DEST))
    .on('end', () => {
      browserSync.reload();
    });
});


gulp.task('uglify', ['build'], () => {
  return gulp.src(`${path.DEST_BUILD}/bundle.js`)
    .pipe(uglify())
    .pipe(gulp.dest(`${path.DEST_BUILD}/bundle.js`));
});


gulp.task('lint', ['uglify'], () => {
  return gulp.src(path.JS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('test', function () {
  return gulp.src(path.SPEC, { read: false })
    .pipe(mocha({
      compilers: {
        js: babel({ presets: ['es2015', 'react'] })
      }
    }));
});
