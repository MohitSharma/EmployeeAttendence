var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap',
    'firebase'])
    .constant('FIREBASE_URL', 'https://mohitsharma.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
        function(event, next, previous, error) {
            if(error === 'AUTH_REQUIRED') {
                $rootScope.message='Sorry, you must log in to access that page';
                $location.path('/login');
            }
        });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller:  'HomeController'
        }).
        when('/login', {
            templateUrl: 'views/login.html',
            controller:  'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller:  'RegistrationController'
        }).
        when('/checkins/:uId/:mId', {
            templateUrl: 'views/checkins.html',
            controller:  'CheckInsController'
        }).
        when('/checkins/:uId/:mId/checkinsList', {
            templateUrl: 'views/checkinslist.html',
            controller:  'CheckInsController'
        }).
        when('/employees', {
            templateUrl: 'views/employee/list.html',
            controller: 'EmployeesController',
            resolve : {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller:  'DashboardController',
            resolve : {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);