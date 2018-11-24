var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req);
  res.render('index', { title: 'blog|phantom',req });
});
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'signin',req });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup' ,req});
});
router.get('/profile',islogedin, function(req, res, next) {
  res.render('profile', { title: 'profile' , req});
});
router.post('/signup',passport.authenticate('local.signup', {
 failureRedirect: '/signup',
 successRedirect:'/profile'
 //failureFlash:true 
}));
router.post('/signin',passport.authenticate('local.signin',{
	failureRedirect: '/signin',
    successRedirect:'/profile'
}));
router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
})

module.exports = router;

function islogedin(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/signin');
}
