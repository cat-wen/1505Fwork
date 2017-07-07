var gulp=require("gulp");               // gulp
var imgmin=require("gulp-imagemin");    // ѹ��ͼƬ
var uglify=require("gulp-uglify");      // ѹ��js
var htmlmin=require("gulp-htmlmin");    // ѹ��html
var cssmin=require("gulp-minify-css");  // ѹ��css
//var concat=require("gulp-concat");      // �ϲ�
//var scssmin=require("gulp-sass");       // ����scss��sass
var webserver = require('gulp-webserver');// webserver ����
//var connect=require("gulp-connect");    // connect ����
//var browserify = require('gulp-browserify');// jsģ�黯
gulp.task('imgmin', function () {
    gulp.src('./img/*.{png,jpg,gif,ico}')
        .pipe(imgmin({
            optimizationLevel: 5, //���ͣ�Number  Ĭ�ϣ�3  ȡֵ��Χ��0-7���Ż��ȼ���
            progressive: true, //���ͣ�Boolean Ĭ�ϣ�false ����ѹ��jpgͼƬ
            interlaced: true, //���ͣ�Boolean Ĭ�ϣ�false ����ɨ��gif������Ⱦ
            multipass: true //���ͣ�Boolean Ĭ�ϣ�false ����Ż�svgֱ����ȫ�Ż�
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
                //�м��
                next()
            },
            open: "/demo/index.html"
        }));
})
gulp.task("default",["server"])