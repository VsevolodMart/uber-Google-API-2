var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var sprite = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var babel = require('gulp-babel');

gulp.task('babel', function () {
    return gulp.src(['app/js/index.js'])
        .pipe(babel())
        .pipe(gulp.dest('app/js/babel'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('cssmin', function(){
  return gulp.src('app/css/*.*')
    .pipe(csso())
    .pipe(gulp.dest('app/css'))
});

gulp.task('jquery', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.js'])
    .pipe(gulp.dest('app/libs'))
});
gulp.task('clean', function() {
  return del.sync('app/fonts/*/')
});

gulp.task('imagemin', function() {
  gulp.src('app/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('..app/libs/open-sans-fontface/fonts/**/*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('..app/fonts/OpenSans'))
});

gulp.task('sprite', function() {

  var spriteData = gulp.src('app/img/icons/**/*.png')
    .pipe(sprite({
      imgName: 'icons.png',
      cssName: 'icons.sass',
      algorithm: 'top-down',
      padding: 20
    }));
  spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('app/img/'));
  spriteData.css
    .pipe(gulp.dest('app/scss/'));

});

gulp.task('svgSprite', function () {
  return gulp.src( 'app/img/svg/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
          render: {
            scss: {
              dest:'../../../sass/_sprite.scss',
              template:"app/sass/_sprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest( 'app/img/svg/'));
});

gulp.task('sass', function() {
  return gulp.src(['!app/sass/bg.sass',
    '!app/scss/utils/*.*',
    '!app/scss/*.sass',
    'app/scss/**/*.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 50 versions', '> 1%', 'ie 6', 'ie 7', 'ie 8' ], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('sass-libs', function() {
  return gulp.src('bower_components/bootstrap/scss/**/*.*')
    .pipe(sass())
    .pipe(gulp.dest('app/scss/libs'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
  return gulp.src(['app/scss/libs**/*.*'])
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('app/css'))
});


gulp.task('scripts', function() {
  return gulp.src([
	'./bower_components/jquery/dist/jquery.js',
	'./bower_components/popper.js/dist/umd/popper.js',
	'./bower_components/bootstrap/dist/js/bootstrap.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function() {
  return gulp.src(['!app/views/**/_*.pug', 'app/views/**/index.pug', 'app/views/**/test.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({ stream: true }))

});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
      scrollProportionally: false,
      notify: false
    }
  })
});


gulp.task('watch', ['sass', 'sass-libs', 'pug', 'babel', 'scripts', 'browserSync'], function() {
  gulp.watch('app/libs/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss', ['sass-libs'], browserSync.reload);
  gulp.watch('app/scss/**/*.+(sass|scss)', ['sass', 'sass-libs'], browserSync.reload);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/js/*.js',['babel'], browserSync.reload);
  gulp.watch('app/libs/**/*+(sass|scss)', browserSync.reload);
  gulp.watch('browserSync', ['sass', 'sass-libs', 'pug', 'scripts']);
});

gulp.task('clean', function() {
  return del.sync('dist');
});


gulp.task('build', ['clean', 'sass', 'scripts'], function() {
  var buildCss = gulp.src(['app/css/main.css', 'app/css/libs.css'])
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var builsJs = gulp.src(['app/js/**/*'])
    .pipe(gulp.dest('dist/js'));

  var builsJs = gulp.src(['app/img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(gulp.dest('dist/img'));

  // var builPug = gulp.src('app/views/**/*')
  //   .pipe(gulp.dest('dist/views'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
