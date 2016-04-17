'use strict';

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var userMethods = require('../modules/user');


router.post('/register', userMethods.register, function(req, res, next) {
  res.send('register!');
});

router.post('/login', userMethods.login, function(req, res, next) {
  res.send('Logged In');
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('userToken').redirect('/');
});

router.get('/dashboard', authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(user);
  });
});

router.get('/profile', authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(user);
  });
});

router.post('/profile', authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) {
      return res.status(400).send(err);
    }
    for (var attr in req.body){
      user[attr] = req.body[attr];
    }
    user.save(function(err, savedUser){
      if(err) {
        return res.status(400).send(err);
      }
    });
    res.send(user);
  });
});

module.exports = router;
