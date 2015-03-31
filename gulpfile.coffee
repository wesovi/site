gulp = require('gulp')
csso = require('gulp-csso')
uglify = require('gulp-uglify')
cache             = require 'gulp-cached'
coffeeCompile     = require 'gulp-coffee'
coffeelint        = require 'gulp-coffeelint'
concat = require('gulp-concat')
recess = require('gulp-recess')
header = require('gulp-header')
gulpFilter = require('gulp-filter')
complexity = require('gulp-complexity')
ngAnnotate = require('gulp-ng-annotate')
templateCache = require('gulp-angular-templatecache')
remember = require('gulp-remember')
sourcemaps = require('gulp-sourcemaps')
minify  = require 'gulp-minify-css'
del               = require 'del'
runSequence = require('run-sequence')


dd
paths         = require ('./config/paths')
errorHandler  = require './config/errors'

banner = [
  '/**'
  ' * Wesovi Site'
  ' * (c) 2015 Iván Corrales Solera <developer@wesovi.com>'
  ' * License: MIT'
  ' * Last Updated: <%= new Date().toUTCString() %>'
  ' */'
  ''
].join('\n')


# clear the cache
gulp.task 'clearCache', ['clearCache'], ->
  delete cache.caches['coffee-cache']
  
gulp.task 'clean', (cb) ->
  del paths.client.temp, {force: true}, cb

gulp.task 'coffee', ['clearCache'], ->
  gulp.src paths.client.coffee
  .pipe cache 'coffee-cache'
  .pipe coffeelint './config/coffeelint.json'
  .on 'warning', errorHandler.onWarning
  .pipe coffeelint.reporter('default')
  .pipe remember 'coffee-cache'
  .pipe coffeeCompile {bare: true}
  .on 'error', errorHandler.onError
  .pipe header banner
  .pipe gulp.dest paths.client.output.scripts
  
gulp.task 'stylesheets', ->
  gulp.src paths.client.stylesheets
  .pipe concat 'styles.min.css'
  .pipe minify {keepBreaks: true}
  .pipe header banner
  .pipe gulp.dest paths.client.output.stylesheets
  


gulp.task 'build', ->
	runSequence 'clean', ['coffee','stylesheets']
	