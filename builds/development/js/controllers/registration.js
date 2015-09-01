myApp.controller('RegistrationController', function($scope, $location, Authentication) {
    $scope.login = function() {
        Authentication.login($scope.user)
            .then(function(authData) {
                console.log("Logged in as:", authData.uid);
                $location.path('/meetings');
            }).catch(function(error) {
                console.log("Authentication failed:", error);
                $scope.message = error.toString();
            });
    };

    $scope.register = function() {
        Authentication.register($scope.user)
            .then(function(user) {
                Authentication.login($scope.user);
                $location.path('/meetings');
            }).catch(function(error) {
                $scope.message = error.message;
            });
    };
});