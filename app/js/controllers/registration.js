
myApp.controller('RegistrationController',
    function($scope, $firebaseAuth, $location, Authentication, FIREBASE_URL, Alert) {
        $scope.navbarCollapsed = true;

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        $scope.login = function() {
            Authentication.login($scope.user)
                .then(function(user) {
                    $location.path('/dashboard');
                }).catch(function(error) {
                    Alert.error(error.message);
                });
        }; //login

        $scope.register = function() {
            Authentication.register($scope.user)
                .then(function(user) {
                    return Authentication.login($scope.user);
                }).then(function(user) {
                    $location.path('/dashboard');
                }).catch(function(error) {
                    Alert.error(error.message);
                });
        }; //register

    }); //RegistrationController