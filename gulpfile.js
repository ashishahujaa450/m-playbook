const { src, dest, parallel } = require('gulp');
// Import Gulp plugins.
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

//compile sass
function css() {
    return src('./app/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('./dist/css'))
}

//transpile js
function js() {
    return src('./app/js/app.js')
        // Stop the process if an error is thrown.
        .pipe(plumber())
        // Transpile the JS code using Babel's preset-env.
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        // Save each component as a separate file in dist.
        .pipe(dest('./dist/js/'))
}

//compress images
function images() {
    return src('./app/img/**/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img/'))
}

// Gulp copy tasks
function html() {
    return src('./app/*.html')
        .pipe(dest('./dist/'))
}

function font() {
    return src('./app/fonts/*')
        .pipe(dest('./dist/fonts'))
}

function cssAssets() {
    return src(['./app/css/bootstrap.min.css', './app/css/animsition.min.css', './app/css/slick.css'])
        .pipe(dest('./dist/css'))
}

function jsAssets() {
    return src(['./app/js/jquery-1.12.4.js', './app/js/bootstrap.bundle.min.js', './app/js/animsition.min.js', './app/js/slick.min.js'])
        .pipe(dest('./dist/js'))
}


exports.font = font;
exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.cssAssets = cssAssets;
exports.jsAssets = jsAssets;

exports.default = parallel(html, font, images, cssAssets, css, jsAssets, js);