const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const {resolve} = require('path')
const clean = require('gulp-clean')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const htmlReplace = require('gulp-html-replace')
const stream = require('stream')

const random = Math.random().toString(36).substr(2, 8)
const env = process.env.NODE_ENV
const product = env === 'production'
const conf = {
    srcPath: resolve(__dirname, './src'),
    distPath: resolve(__dirname, './dist')
}

gulp.task('clean', () => {
    return gulp.src(conf.distPath)
      .pipe(clean())
})
gulp.task('lib', async() => {
    gulp.src(resolve(conf.srcPath, './lib/**/*'))
      .pipe(gulp.dest(resolve(conf.distPath, './lib')))
})
gulp.task('js', async() => {
    const routes = JSON.parse(fs.readFileSync(resolve(conf.srcPath, './routes.json')))
    routes.forEach(function(item) {
      item.moduleName = `${item.title}.module.${random}.js`
    });
    let task = gulp.src(resolve(conf.srcPath, './js/*.js'))
      .pipe(concat(`main.${random}.js`))
    if (product) {
        task = task.pipe(uglify())
    }
    task.pipe(gulp.dest(resolve(conf.distPath, './js')))
    routes.forEach(item => {
        const name = item.moduleName
        let task = item.files && item.files.length && gulp.src(item.files.map(item => resolve(conf.srcPath, item)))
          .pipe(concat(name))
        if (task) {
            if (product) {
              task = task.pipe(uglify())
            }
            task.pipe(gulp.dest(resolve(conf.distPath, './js')))
            item.modulePath = `js/${name}`
        }
    })
    if (!fs.existsSync(conf.distPath)) {
      fs.mkdirSync(conf.distPath)
    }
    fs.writeFileSync(resolve(conf.distPath, `./routes.${random}.js`), 'var routes = ' + JSON.stringify(routes) + ';')
})
gulp.task('html', async() => {
    gulp.src(resolve(conf.srcPath, '**/*.html'))
      .pipe(htmlReplace({
        js: [`routes.${random}.js`, `js/main.${random}.js`],
        css: `css/main.$${random}.css`
      }))
      .pipe(gulp.dest(conf.distPath))
})
gulp.task('css', async() => {
    let task = gulp.src(resolve(conf.srcPath, './css/*.css'))
    if (!product) {
      task = task.pipe(sourcemaps.init())
    }
    task = task.pipe(postcss([autoprefixer()]))
    if (product) {
      task = task.pipe(cleanCss())
    } else {
      task = task.pipe(sourcemaps.write('.'))
    }
    task.pipe(concat(`main.$${random}.css`))
      .pipe(gulp.dest(resolve(conf.distPath, './css')))
})
gulp.task('watch', async() => {
  gulp.watch(resolve(conf.srcPath, './lib/**/*'), ['lib', 'html'])
  gulp.watch(resolve(conf.srcPath, './**/*.js'), ['js', 'html'])
  gulp.watch(resolve(conf.srcPath, './**/*.html'), ['html'])
  gulp.watch(resolve(conf.srcPath, './css/**/*'), ['css', 'html'])
})
gulp.task('build', async() => {
  gulp.start(['lib', 'js', 'html', 'css', 'watch'])
})
