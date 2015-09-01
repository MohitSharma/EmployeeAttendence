myApp.controller('StatusController', function($scope, $rootScope, $firebaseAuth, Authentication, $location) {
    Authentication.status(function(authUser){
        if (authUser) {
            console.log("Logged In")
            $scope.userEmail = authUser.password.email;
        }
        else {
            console.log("Logged Out");
            $scope.userEmail = null;
        }
    });

    $scope.logout = function() {
        Authentication.logout();
        $location.path('/login');
    };

});