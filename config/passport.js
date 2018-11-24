var passport = require('passport');
var LocalStrategy =require('passport-local').Strategy;
const{mongoose} = require('../bd/index');
var {User}= require('../models/User');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({'email':email},function(err,user){
    	if (err) {
    		return done(err);
    	}
    	if (user) {
    		return done(null,false);
    	}
    	var newuser = new User();
    	newuser.firstname = req.body.firstname;
    	newuser.lastname = req.body.lastname;
    	newuser.email = req.body.email;
    	newuser.password = newuser.encryptpass(req.body.password);

    	newuser.save(function(err){
    		if (err) {
    			return done(err);
    		}
    		return done(null,newuser);

    	});

    });
  }
));


passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({'email':email},function(err,user){
    	if (err) {
    		return done(err);
    	}
    	if (!user) {
    		return done(null,false);
    	}
    	if (!user.validpassword(req.body.password)) {
    		return done(null,false);
    	}
    	return done(null,user);
    	});
  }
));


