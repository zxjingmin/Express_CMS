'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    openURL = require('open'),
    lazypipe = require('lazypipe');

var paths = {
  app:'./app',
  src:'./src',
  dist: './dist',
  temp:'./temp'
};

// scss 处理
paths.scss_styles=paths.src+'/sass/';
paths.css_styles=paths.dist+'/css/';

var css=lazypipe()
    .pipe($.compass,{
      css: paths.css_styles,
      sass: paths.scss_styles,
      require: ['compass/import-once/activate','support-for',"normalize-scss",'susy']
    })
    .pipe($.autoprefixer,{ browsers: ['last 4 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
      })
    .pipe($.csscomb)
    .pipe($.minifyCss,{
      keepBreaks:true,
      restructuring:false,
      semanticMerging:false
    })
    .pipe(gulp.dest,paths.css_styles);

gulp.task('styles', function () {
  gulp.src(paths.scss_styles+"**/*.scss")
    .pipe($.plumber())
    .pipe(css());
});

paths.js_src=paths.src+"/js/";
paths.js_dist=paths.dist+"/js/";
var js=lazypipe()
     .pipe($.uglify,{compress: {
            negate_iife: false
         }})  //使用uglify进行压缩,更多配置请参考：
    .pipe($.concat,"app.concat.js")
    .pipe($.rename,'app.min.js')
    .pipe(gulp.dest,paths.js_dist);

gulp.task('javascript',function(){
  gulp.src(paths.js_src+"**/*.js")
    .pipe($.plumber())
    .pipe(js());
})

var openBrowser=false;

gulp.task('develop', function () {
  $.livereload.listen();
  $.nodemon({
    script: './app/app.js',
    ext: 'js coffee jade',
    ignore: [paths.js_src+"/**/*.js",paths.js_dist+"/**/*.js"],
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      var liveTime=null;
      if(/^Express server listening on port/.test(chunk)){
            if(!liveTime){
              clearTimeout(liveTime);
            }
            liveTime=setTimeout(function(){
              $.livereload.changed(__dirname)
              liveTime=null;
            },500)
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  }).on('start', function () {
    if(! openBrowser){
      openBrowser=true;
      openURL("http://localhost:3000/");
    }
  }).on('message', function (event) {
      console.log('nodemon '+event.type);
  });

});

gulp.task('watch', function() {
  gulp.watch(paths.scss_styles+"**/*.scss",function(event){
      console.log(event.path);
      gulp.src(paths.scss_styles+"**/*.scss")
        .pipe($.plumber())
        .pipe(css())
        .pipe($.livereload());
  });
  gulp.watch(paths.js_src+"**/*.js",function(event){
      console.log("javascript file changed:"+event.path);
      gulp.src(paths.js_src+"**/*.js")
        .pipe($.plumber())
        .pipe(js())
        .pipe($.livereload());
  })
});

gulp.task('test', function() {
  return gulp.src(['test/**/test-*.js'], { read: false })
    .pipe($.mocha({
      reporter: 'spec',
    }));
});

gulp.task('default', ['styles','javascript','develop','watch']);