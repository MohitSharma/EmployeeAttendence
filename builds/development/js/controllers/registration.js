myApp.controller('RegistrationController', function($scope, $location) {
    $scope.login = function() {
        $location.path('/meetings');
    };

    $scope.register = function() {
        $location.path('/meetings');
    };
});