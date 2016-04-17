"use strict";

var app = angular.module("bookMarkers", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/partials/home.html",
      controller: "homeCtrl"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/partials/register.html",
      controller: "registerCtrl"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/partials/login.html",
      controller: "loginCtrl"
    })
    .state("dash", {
      url: "/dashboard",
      templateUrl: "/partials/dashboard.html",
      controller: "dashCtrl"
    })
    .state("profile", {
      url: "/profile",
      templateUrl: "/partials/profile.html",
      controller: "profileCtrl"
    })
    .state("editProfile", {
      url: "/profile/edit",
      templateUrl: "/partials/editProfile.html",
      controller: "editProfileCtrl"
    })

  $urlRouterProvider.otherwise("/");
});

app.controller("dashCtrl", function($http, $state){
  $http.get("/users/dashboard")
    .then(function(){},
  function(err) {
    $state.go("home");
  });
});

app.controller("editProfileCtrl", function($scope, $http, $state){
  $http.get("/users/profile")
    .then(function(profileData) {
      var user = profileData.data;
      $scope.user = user;
    },
    function(err) {
      swal("You must be logged in to view the previous page");
      $state.go("login")
    });

  $scope.updateProfile = function(){
    $http.post("/users/profile", $scope.user)
      .then(function(){
        swal("Profile updated!", "", "success");
        $state.go("profile");
      },
      function(err){
        console.error(err);
      });
  }
});

app.controller("homeCtrl", function($http, $state){
  $http.get("/users/dashboard")
    .then(function(){},
  function(err) {
    $state.go("home");
  });
});

app.controller("loginCtrl", function($scope, $http, $state){
  $scope.login = function(){
    var userData = { email: $scope.email, password: $scope.password };

    $http.post("/users/login", { email: $scope.email, password: $scope.password})
      .then(function(data){
        $state.go("dash");
      }, function(err){
        swal({
          title: "Must enter valid e-mail password combination.",
          type: "error"
        });
      });
    }
});

app.controller("profileCtrl", function($scope, $http, $state){
  $http.get("/users/profile")
    .then(function(profileData) {
      var user = profileData.data;
      $scope.user = user;
    },
  function(err) {
    swal("You must be logged in to view the previous page");
    $state.go("login");
  });
});

app.controller("registerCtrl", function($scope, $http, $state){

  $scope.register = function(){
    var userData = {
      email: $scope.email,
      password: $scope.password,
      username: $scope.username
    };

    if ($scope.password === $scope.password2){
      $http.post("/users/register", userData)
        .then(function(data){
          swal("Registered Successfully!", "", "success");
          $state.go("login")
        }, function(err){
            console.error(err);
        });
    } else {
      swal("Your passwords must match.", "", "error");
      $scope.password = "";
      $scope.password2 = "";
    }
  }
});
