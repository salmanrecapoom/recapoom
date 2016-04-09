var express = require('express');
var config= require('./server/configure');
var app = express();

//var fortune = require('./helpers/fortune.js');

// set up handlebars view engine
/*var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');
*/
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app=config(app);

//app.use(express.static(__dirname + '/public'));

/*
app.disable('x-powered-by');

app.set('view cache', true);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('opening', {layout : null});
});

app.get('/home', function(req, res){
	res.render('home', {title : 'Welcome to recapoom'});
});

app.get('/about', function(req, res){
	res.render('about', { fortune: fortune.getFortune(), 'title' : 'About recapoom' });
});

app.get('/nostalgia-section/era', function(req, res){
	res.render('nostalgia-section/era', {'title' : 'Era page'});
});

app.get('/nostalgia-section/request-for-post', function(req, res){
	res.render('nostalgia-section/request-for-post', {'title' : 'Post page'});
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
	res.render('404', { layout: null });
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500', { layout: null });
});
*/
var server = app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});