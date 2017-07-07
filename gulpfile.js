var gulp=require("gulp");               // gulp
var imgmin=require("gulp-imagemin");    // 压缩图片
var uglify=require("gulp-uglify");      // 压缩js
var htmlmin=require("gulp-htmlmin");    // 压缩html
var cssmin=require("gulp-minify-css");  // 压缩css
//var concat=require("gulp-concat");      // 合并
//var scssmin=require("gulp-sass");       // 编译scss，sass
var webserver = require('gulp-webserver');// webserver 服务
//var connect=require("gulp-connect");    // connect 服务
//var browserify = require('gulp-browserify');// js模块化
gulp.task('imgmin', function () {
    gulp.src('./img/*.{png,jpg,gif,ico}')
        .pipe(imgmin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('bound/img'));
});
gulp.task("jsmin",function(){
    gulp.src("./js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("bound/js"))
});
gulp.task("cssmin",function(){
    gulp.src("./css/*.scss")
        //.pipe(scssmin())
        .pipe(cssmin())
        .pipe(gulp.dest("bound/css"))
});
gulp.task("htmlmin",function(){
    gulp.src("./*.html")
        .pipe(htmlmin({collapseWhitespace: true }))
        .pipe(gulp.dest("bound/demo"))
});
gulp.task("watch",["imgmin","jsmin", "cssmin", "htmlmin"],function(){
    gulp.watch("./*.html", ["htmlmin"]);
    gulp.watch("./css/*.sass", ["cssmin"]);
    gulp.watch("./js/*.js", ["jsmin"]);
    gulp.watch("./img/*.png", ["imgmin"]);
});
gulp.task("server",["watch"], function() {
    gulp.src('./bound')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port:8056,
            middleware: function(req, res, next) {
                //中间件
                next()
            },
            open: "/demo/index.html"
        }));
})
gulp.task("default",["server"])