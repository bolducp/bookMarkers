app.controller("dashCtrl", function($http, $state){
  $http.get("/users/dashboard")
    .then(function(){},
  function(err) {
    $state.go("home");
  });
});
