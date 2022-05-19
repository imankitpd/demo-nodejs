var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
  name: {type: String, required: true},
  city: String,
  email: {type: String, required: true},
  mobile: {type: String, required: true}
});

var UserDetails = mongoose.model('UserDetails', userDetailsSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {
  UserDetails.find().then(function (users) {
    res.render('users', {users: users, title: "Users"});
    // NSER BRANCH 1ST CHANGE
  });
});

// Add User
router.get('/add', function (req, res, next) {
  res.render('add-user', {title: "Add User", user: {name:"", city:"", email:"", mobile:""}});
});

router.post('/add', function (req, res, next) {
  var user = {
    name: req.body.name,
    city: req.body.city,
    email: req.body.email,
    mobile: req.body.mobile
  };
  var details = new UserDetails(user);
  details.save();

  res.redirect('/users');
});

router.get('/update/:id', function (req, res, next) {
  var id = req.params.id;
  UserDetails.findById(id, function(err, detail) {
    res.render('add-user', {user: detail, title: "Edit User"});
  });  
});

router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  UserDetails.findById(id, function(err, details) {
    details.name = req.body.name;
    details.city = req.body.city;
    details.email = req.body.email;
    details.mobile = req.body.mobile;
    details.save();
    res.redirect('/users');
  });  
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  UserDetails.findByIdAndRemove(id).exec();
  res.redirect('/users');
});

module.exports = router;
