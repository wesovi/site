
exports.ping = function(req,res,next){
	var response = Object();
	response.message ='Everything seems to be ok';		
	res.status('200')
		.jsonp(response);
	next()
}