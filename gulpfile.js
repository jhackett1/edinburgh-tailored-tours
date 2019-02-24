const { src, dest, watch, series, parallel } = require("gulp")
const sass = require("gulp-sass")
const webpack = require("webpack-stream")
const path = require("path")
const cleanCSS = require("gulp-clean-css")
const browserSync = require('browser-sync').create();

sass.compiler = require("node-sass")

// Run server
const runServer = (cb) => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    watch("./*.html").on('change', browserSync.reload);
}


// Compile sass
const compileSass = (cb) => {
    src("./src/main.sass")
        .pipe(sass({
            includePaths: ["node_modules"]
        }).on("error", sass.logError))
        .pipe(dest("./"))
    return cb()
}

// Transpile js
const transpileJs = (cb) => {
    return src("./src/*.js")
        .pipe(webpack( {
            mode: "production",
            entry: "./src/main.js",
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
                path: path.resolve(__dirname, "public"),
                filename: "bundle.js"
            }
        }))
        .pipe(dest("./"))
}

// Minify CSS
const minifyCss = (cb) => {
    return src("./dist/*.css")
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(dest("./"))
}

// Watch sass
const watchSass = (cb) => {
    watch(["src/*.sass", "src/*.css"], (cb)=>{
        src("./src/main.sass")
            .pipe(sass({
                includePaths: ["node_modules"]
            }).on("error", sass.logError))
            .pipe(dest("./"))
            .pipe(browserSync.stream())
        return cb()
    })
    
}

// Watch js
const watchJs = (cb) => {
    return src("./src/*.js")
        .pipe(webpack( {
            mode: "development",
            watch: true,
            entry: "./src/main.js",
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
                path: path.resolve(__dirname, "public"),
                filename: "bundle.js"
            }
        }))
        .pipe(dest("./"))
        .on('change', browserSync.reload)
}

// Production build task
exports.build = series(compileSass, transpileJs, minifyCss)

// Default watch task
exports.default = parallel(watchSass, watchJs, runServer)