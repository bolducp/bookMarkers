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
