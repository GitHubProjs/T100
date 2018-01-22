var gulp = require('gulp');
var jslint = require('gulp-jslint'); //js语法检查
var concat = require('gulp-concat'); //合并文件
var uglify = require('gulp-uglify');//js压缩代码
var csslint = require('gulp-csslint'); //css语法检查
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css'); //css压缩gulp-minify-css已经被废弃，请使用gulp-clean-css，
//var minifyHtml = require("gulp-minify-html");//html语法检查
var imagemin = require('gulp-imagemin');//图片压缩
//var rename    = require('gulp-rename');//文件更名
//var rev = require('gulp-rev');//更改文件版本号
//var revCollector = require('gulp-rev-collector');//用于rev生产版本号后，替换页面路径
//var notify = require('gulp-notify');//加控制台文字描述用的
var browserSync = require('browser-sync').create();//browser-sync自动刷新
var fileinclude = require('gulp-file-include');//包含模板文件
var replace = require('gulp-replace'); //A string replace plugin for gulp 3
//var postcss = require('gulp-postcss');
//var reporter = require('postcss-reporter');
//var stylelint = require('stylelint');
var htmlmin = require('gulp-htmlmin');
var del = require('del');//删除目录下文件


gulp.task('h', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src(['src/*.html'])
     	.pipe(fileinclude())
		.pipe(replace(/\?V/g, '?V=' + new Date().getTime()))
//      .pipe(htmlmin(options))//上线前不要压缩
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('mh', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src(['src/m/*.html'])
        .pipe(fileinclude())
        .pipe(replace(/\?V/g, '?V=' + new Date().getTime()))
        //      .pipe(htmlmin(options))//上线前不要压缩
        .pipe(gulp.dest('build/m/'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('c', function() {
	gulp.src(['src/css/reset.css', 'src/css/*.css', 'src/css/*.less'])
		.pipe(less())
		//这里可以加css sprite 让每一个css合并为一个雪碧图
		//.pipe(spriter({}))
		.pipe(cleanCSS())
		.pipe(concat('base.min.css'))
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('mc', function() {
    gulp.src(['src/css/m/m_reset.css', 'src/css/m/*.css', 'src/css/m/*.less'])
        .pipe(less())
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        .pipe(cleanCSS())
        .pipe(concat('m.min.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('i', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('mi', function () {
    gulp.src(['src/img/m/*/*.{png,jpg,gif,ico}'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/img/m/'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('lib', function () {
    return gulp.src([
            'src/js/*.js'
        ])
        .pipe(concat('base.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('j', function () {
    return gulp.src([
            'src/assets/js/jquery-1.11.2.min.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('mj', function () {
    return gulp.src([
        'src/js/m/*.js'
    ])
        .pipe(concat('m.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('x', function () {
    return gulp.src([
        'src/assets/js/bootstrap.min.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
gulp.task('y', function () {
    return gulp.src([
        'src/assets/css/bootstrap.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.stream());  //文件有更新自动执行
});
//删除build目录下文件
gulp.task('clean',function(cb){
    return del(['build/*'],cb);
})
//通用模块
gulp.task('fileinclude', function() {
    // 适配src中所有文件夹下的所有html
    gulp.src(['src/*.html','src/common/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: './src/'
        }))
});

gulp.task('mf', function() {
    // 适配src中所有文件夹下的所有html
    gulp.src(['src/m/*.html','src/m/common/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/m/'
        }))
});
// var px2rem = require('gulp-px2rem-plugin');
// gulp.task('px2rem1', function() {
//     gulp.src('src/css/m/*.css')
//         .pipe(px2rem())
// });
//发布
gulp.task('f', ['i', 'lib','j','x','y', 'c','fileinclude','h','mi', 'mf','mc','mh','mj']);
gulp.task('serve', ['clean'], function() {
    gulp.start('i', 'lib', 'j','x','y','c','fileinclude', 'h','mi', 'mf','mc','mh','mj');
    browserSync.init({
        port: 2016,
        server: {
            baseDir: ['build']
        }
    });
    //监控文件变化，自动更新
    gulp.watch('src/js/*.js', ['lib']);
    // gulp.watch('src/css/*', ['c','mc']);
    // gulp.watch('src/img/*/*', ['i','mi']);
    // gulp.watch('src/*.html', ['fileinclude','h','mh','mf']);
    // gulp.watch('src/common/*.html', ['fileinclude','h','mf','mh']);



    gulp.watch('src/js/*/*', ['j','mj']);
    gulp.watch('src/js/*', ['j','mj']);
    gulp.watch('src/css/**/*', ['c','mc']);
    gulp.watch('src/css/*', ['c','mc']);
    gulp.watch('src/img/*/*', ['i']);
    gulp.watch('src/img/*/*/*', ['mi']);
    gulp.watch('src/*.html', ['fileinclude','h','mh']);
    gulp.watch('src/common/*.html', ['fileinclude','h','mh']);
    gulp.watch('src/m/*.html', ['mf','h','mh']);
    gulp.watch('src/m/common/*.html', ['mf','h','mh']);
});

gulp.task('default',['serve']);
