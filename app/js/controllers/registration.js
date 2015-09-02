
myApp.controller('RegistrationController',
    function($scope, $firebaseAuth, $location, Authentication) {
        $scope.navbarCollapsed = true;

        var ref = new Firebase('https://attendanceldcapp.firebaseio.com/');
        var auth = $firebaseAuth(ref);

        $scope.login = function() {
            Authentication.login($scope.user)
                .then(function(user) {
                    $location.path('/meetings');
                }).catch(function(error) {
                    $scope.message = error.message;
                });
        }; //login

        $scope.register = function() {
            Authentication.register($scope.user)
                .then(function(user) {
                    Authentication.login($scope.user);
                }).catch(function(error) {
                    $scope.message = error.message;
                });
        }; //register

    }); //RegistrationController