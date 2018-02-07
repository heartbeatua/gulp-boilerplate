const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const cleancss = require('gulp-clean-css')
const gulpif = require('gulp-if')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const sourcemaps = require('gulp-sourcemaps')
const svgstore = require('gulp-svgstore')
const svgmin = require('gulp-svgmin')
const uglify = require('gulp-uglify')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const argv = require('yargs').argv


let folder = './'
let dist = './dist'
let scss = `${folder}/src/scss/**/*.scss`

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: folder
    },
    notify: false
  })
})

gulp.task('bs-reload', () => browserSync.reload())

gulp.task('styles', () => {
  return gulp.src(scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.message)
        this.emit('end')
      }}))
    .pipe(gulpif(!argv.minify, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(argv.minify, autoprefixer('last 1 versions')))
    .pipe(gulpif(argv.minify, cleancss()))
    .pipe(gulpif(!argv.minify, sourcemaps.write('./map')))
    .pipe(gulp.dest(`${folder}/css`))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('styleslint', () => {
  return gulp.src(scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('scripts', () => {
  return gulp.src(`${folder}/src/js/**/*.js`)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.message)
        this.emit('end')
      }}))
    .pipe(gulpif(!argv.minify, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpif(argv.minify, uglify()))
    .pipe(gulpif(!argv.minify, sourcemaps.write('./map')))
    .pipe(gulp.dest(`${folder}/js/common`))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('svgmin', () => {
  return gulp.src(`${folder}/src/svg-symbols/*.svg`)
    .pipe(svgmin())
    .pipe(gulp.dest(`${folder}/trash/svg-store`))
})

gulp.task('svg', ['svgmin'], () => {
  return gulp.src(`${folder}/trash/svg-store/*.svg`)
    .pipe(svgstore({inlineSvg: true}))
    .pipe(gulp.dest(`${folder}/img`))
})


gulp.task('default', ['styles', 'scripts', 'svg'])

gulp.task('dev', () => {
  runSequence(['default'], 'browser-sync', () => {
    gulp.watch(`${folder}/src/scss/**/*.scss`, ['styles'])
    gulp.watch(`${folder}/src/js/**/*.js`, ['scripts'])
    gulp.watch(`${folder}/**/*.html`, ['bs-reload'])
  })
})

gulp.task('build', ['default'], () => {
  gulp.src(`${folder}/css/**/*.css`, { base: '.' }).pipe(gulp.dest(dist))
  gulp.src(`${folder}/js/**/*.js`, { base: '.' }).pipe(gulp.dest(dist))
  gulp.src(`${folder}/img/**/*`, { base: '.' }).pipe(gulp.dest(dist))
  gulp.src(`${folder}/*.html`).pipe(gulp.dest(dist))
})
