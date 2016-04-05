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
