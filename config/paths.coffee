# Path globs
module.exports =
  client:
  	tests: [
  		'client/javascripts/**/*_test.coffee',
  		'client/javascripts/**/*_test.js'
  	]
  	coffee:[
  		'client/javascripts/**/*.coffee'
  	]
  	stylesheets:[
  		'client/stylesheets/*.css'
  	]
  	vendors:'client/vendors'
  	output:
  		root: 'www/client'
  		scripts: 'www/client/scripts'
  		stylesheets: 'www/client/css/'
  	temp: [
	    'www/client/*'
	    'dist/client/*'
	]
