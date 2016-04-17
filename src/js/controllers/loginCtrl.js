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
