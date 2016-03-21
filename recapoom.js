var express = require('express');

var app = express();

var fortune = require('./lib/fortune.js');
/*var fortunes = [
		"Conquer your fears or they will conquer you.",
		"Rivers need springs.",
		"Do not fear what you don't know.",
		"You will have a pleasant surprise.",
		"Whenever possible, keep it simple.",
]; */

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.disable('x-powered-by');

app.set('view cache', true);

//if( app.thing === null ) console.log( 'bleat!' );

/*function salman (req,res,next)
{
	var hamza = {};
hamza.salman='love';
console.log('ja,za');
req.data= hamza;
next();
}

app.get('/user/:username', function(req,res,next){salman(req,res,next)}, function(req,res,next){ console.log(req.query); console.log('lalal'); 
	console.log(req.params.username);
	if(req.params.username=='hamza' || req.params.username=='salman'){
		return res.send('authenticated');
	}else{
		res.send('not authenticated');
	}
	res.send(req.query);

});

*/

//app.get('/', function(req,res,next){salman(req,res,next)}, function(req,res,next){ console.log(req.query); console.log('lalal'); res.send(req.query);});

// app.get('/', function (req, res, next) {
//   console.log('ID:');
//   next();
// }, function (req, res, next) {
//   res.send('User Info');
// });

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { fortune: fortune.getFortune() });
});

app.get('/nostalgia-section/era', function(req, res){
	res.render('nostalgia-section/era');
});

app.get('/nostalgia-section/request-for-post', function(req, res){
	res.render('nostalgia-section/request-for-post');
});

app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});

