myApp.factory('CountEmployees', function($firebaseArray, $rootScope, FIREBASE_URL) {

    $rootScope.currentUser.$watch(function()  {
        var ref = new Firebase(FIREBASE_URL + '/users/' +
            $rootScope.currentUser.$id + '/employees');
        var employeesArray = $firebaseArray(ref);

        employeesArray.$loaded(function(data) {
            $rootScope.howManyEmployees = employeesArray.length;
        });

        employeesArray.$watch(function(data) {
            $rootScope.howManyEmployees = employeesArray.length;
        });

    });

    return true;
});