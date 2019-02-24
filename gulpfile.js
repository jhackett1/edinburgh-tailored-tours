const { src, dest, watch, series, parallel } = require("gulp")
const sass = require("gulp-sass")
const webpack = require("webpack-stream")
const path = require("path")
const cleanCss = require("gulp-clean-css")
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()


// Run live reload server
const runServer = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
}


////////////
// HTML
////////////

// Watch for HTML changes, then compile
const watchHtml = () => {
    watch(["./src/*.html"], (cb) => {
        copyHtml()
    })
        .on('change', browserSync.reload)
}
// Copy HTML files
const copyHtml = () => {
    return src("./src/*.html")
        .pipe(dest("dist"))
}


////////////
// SASS
////////////

// Set sass compiler
sass.compiler = require("node-sass")
// Watch for sass changes, then compile
const watchSass = () => {
    watch(["src/sass/*"], (cb)=>{
        compileSass()
    })
}
// Compile sass
const compileSass = () => {
    return src("./src/sass/main.sass")
        .pipe(sass({
            includePaths: ["node_modules"]
        }).on("error", sass.logError))
        .pipe(dest("dist/css"))
}
// Minify CSS
const minifyCss = () => {
    return src("./dist/*.css")
        .pipe(cleanCss({compatibility: "ie8"}))
        .pipe(dest("dist/css"))
}


////////////
// IMAGES
////////////

// Shrink images for production build
const compressImages = () => {
    return src("./src/img/*")
        .pipe(imagemin())
        .pipe(dest("dist/img"))
}


////////////
// JS
////////////

// Production webpack configuration object
let webpackConfig = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["css-loader"],
              },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", 
                              {
                                targets: {
                                  browsers: ["last 2 Chrome versions"]
                                }
                              }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    output: {
        filename: "bundle.js"
    }
}
// Transpile js
const transpileJs = () => {
    return src("./src/js/main.js")
        .pipe(webpack(webpackConfig))
        .pipe(dest("dist/js"))
}
// Watch js
const watchJs = (cb) => {
    webpackConfig.mode = "development"
    webpackConfig.watch = true
    src("./src/js/main.js")
        .pipe(webpack(webpackConfig))
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream())
}


// Production build task
exports.build = series(copyHtml, compileSass, minifyCss, transpileJs, compressImages)
// Default watch task
exports.default = parallel(runServer, watchHtml, watchSass, watchJs)