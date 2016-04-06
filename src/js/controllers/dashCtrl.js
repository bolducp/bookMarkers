app.controller("dashCtrl", function($http, $state){
  $http.get("/users/dashboard")
    .then(function(){},
  function(err) {
    swal("You must be logged in to view the previous page");
    $state.go("login");
  });
});
