"use strict";

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var userMethods = require("../modules/user");

var Firebase = require('firebase');
var ref = new Firebase('https://meandates.firebaseio.com/');


router.post('/register', userMethods.register, function(req, res, next) {
  res.send("register!");
});

router.post('/login', userMethods.login, function(req, res, next) {
  res.send("Logged In");
});

router.post("/logout", function(req, res, next) {
  res.clearCookie("userToken").redirect("/"); 
});

module.exports = router;
