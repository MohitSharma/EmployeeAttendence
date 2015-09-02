myApp.controller('NavBarCtrl', function($scope, Authentication, $location) {
    $scope.navbarCollapsed = true;
    $scope.logout = function() {
        Authentication.logout();
        $location.path('/login');
    }; //logout
}); //Navbar Controller