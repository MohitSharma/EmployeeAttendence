myApp.controller('StatusController', function($scope, $location, Authentication) {
    $scope.navbarCollapsed = true;
    $scope.logout = function() {
        Authentication.logout();
        $location.path('/login');
    }; //logout

}); //StatusController