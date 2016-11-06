var express = require('express');
var app = express();
var fs = require("fs");
var mongoose = require("mongoose");
var JSONAPISerializer = require("jsonapi-serializer").Serializer;
var JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;
var bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

/**
* DB STUFF
*/ 

mongoose.connect("mongodb://localhost/beers");

var db = mongoose.connection;

var beerSchema = mongoose.Schema({
	name: String
});

var userSchema = mongoose.Schema({
	name: String
});

var flavorSchema = mongoose.Schema({
	name: String
});

var Beer = mongoose.model("Beer", beerSchema);
var User = mongoose.model("User", userSchema);
var Flavor = mongoose.model("Flavor", userSchema);

/**
* JSON API STUFF
*/

var BeerSerializer = new JSONAPISerializer('beers', {
	attributes: ['name']
});
var BeerDeserializer = new JSONAPIDeserializer('beers', {
	attributes: ['name']
});
var UserSerializer = new JSONAPISerializer('users', {
	attributes: ['name']
});
var UserDeserializer = new JSONAPIDeserializer('users', {
	attributes: ['name']
});
var FlavorSerializer = new JSONAPISerializer('flavors', {
	attributes: ['name']
});
var FlavorDeserializer = new JSONAPIDeserializer('flavors', {
	attributes: ['name']
});
/**
* ROUTES
*/

/* BEER */ 

// List all beers
app.get('/beers', function (req, res) {
	Beer.find({}, function (err, beers) {
		res.send(BeerSerializer.serialize(beers));
	});
});

// Find beer by id
app.get('/beers/:id', function (req, res) {
	console.log('finding beer with id ' + req.params.id);
	Beer.findById(req.params.id, function (err, beer) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			console.log('found beer ' + JSON.stringify(beer));
			res.send(BeerSerializer.serialize(beer));
		}
		
	});
});

// Delete beer by id
app.delete('/beers/:id', function (req, res) {
	console.log('deleting beer with id ' + req.params.id);
	Beer.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			console.log('removed beer');
			res.sendStatus(204);	
		}
	});
});

// Update existing beer
app.patch('/beers/:id', function (req, res) {
	BeerDeserializer.deserialize(req.body, function (err, beer) {
		if (req.params.id) {
			Beer.findByIdAndUpdate(req.params.id, {
				name: beer.name
			}, {new: true}, function (err, savedBeer) {
				if (err) {
					console.log(err);
					res.sendStatus(500);
				} else {
					console.log('beer patched');
					res.send(BeerSerializer.serialize(savedBeer));
				}
			});
		}
	});
});

// Save a new beer
app.post('/beers', function (req, res) {
	BeerDeserializer.deserialize(req.body, function (err, beer) {
		var beer = new Beer(beer);
		beer.save(function (err, beer) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log('beer saved with name ' + beer.name);
				res.send(BeerSerializer.serialize(beer));
			}
		});
	});
});

/* USER */ 

// List all beers
app.get('/users', function (req, res) {
	User.find({}, function (err, users) {
		res.send(UserSerializer.serialize(users));
	});
});

// Find user by id
app.get('/users/:id', function (req, res) {
	console.log('finding user with id ' + req.params.id);
	User.findById(req.params.id, function (err, user) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			console.log('found user ' + JSON.stringify(user));
			res.send(UserSerializer.serialize(user));
		}
		
	});
});

// Delete user by id
app.delete('/users/:id', function (req, res) {
	console.log('deleting user with id ' + req.params.id);
	User.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			console.log('removed user');
			res.sendStatus(204);	
		}
	});
});

// Update existing user
app.patch('/users/:id', function (req, res) {
	UserDeserializer.deserialize(req.body, function (err, user) {
		if (req.params.id) {
			User.findByIdAndUpdate(req.params.id, {
				name: user.name
			}, {new: true}, function (err, savedBeer) {
				if (err) {
					console.log(err);
					res.sendStatus(500);
				} else {
					console.log('user patched');
					res.send(UserSerializer.serialize(savedBeer));
				}
			});
		}
	});
});

// Save a new user
app.post('/users', function (req, res) {
	UserDeserializer.deserialize(req.body, function (err, user) {
		var user = new User(user);
		user.save(function (err, user) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log('user saved with name ' + user.name);
				res.send(UserSerializer.serialize(user));
			}
		});
	});
});

/* FLAVOR */ 

// List all flavors
app.get('/flavors', function (req, res) {
	Flavor.find({}, function (err, flavors) {
		res.send(FlavorSerializer.serialize(flavors));
	});
});

// Find flavor by id
app.get('/flavors/:id', function (req, res) {
	console.log('finding flavor with id ' + req.params.id);
	Flavor.findById(req.params.id, function (err, flavor) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			console.log('found flavor ' + JSON.stringify(flavor));
			res.send(FlavorSerializer.serialize(flavor));
		}
		
	});
});

// Delete flavor by id
app.delete('/flavors/:id', function (req, res) {
	console.log('deleting flavor with id ' + req.params.id);
	Flavor.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			console.log('removed flavor');
			res.sendStatus(204);	
		}
	});
});

// Update existing flavor
app.patch('/flavors/:id', function (req, res) {
	FlavorDeserializer.deserialize(req.body, function (err, flavor) {
		if (req.params.id) {
			Flavor.findByIdAndUpdate(req.params.id, {
				name: flavor.name
			}, {new: true}, function (err, savedBeer) {
				if (err) {
					console.log(err);
					res.sendStatus(500);
				} else {
					console.log('flavor patched');
					res.send(UserSerializer.serialize(savedBeer));
				}
			});
		}
	});
});

// Save a new flavor
app.post('/flavors', function (req, res) {
	FlavorDeserializer.deserialize(req.body, function (err, flavor) {
		var flavor = new Flavor(flavor);
		flavor.save(function (err, flavor) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log('flavor saved with name ' + flavor.name);
				res.send(UserSerializer.serialize(flavor));
			}
		});
	});
});


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Beer API listening at http://%s:%s", host, port)

})