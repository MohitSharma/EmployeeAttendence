myApp.factory('Authentication', function($firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, $location, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    authObj.$onAuth(function(authUser) {
        if (authUser) {
            var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
            var user = $firebaseObject(ref);
            $rootScope.currentUser = user;
        } else {
            $rootScope.currentUser = '';
        }
    });

    var myObject = {
        login: function(user) {
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            });
        },
        status: function(callback) {
            return authObj.$onAuth(callback);
        },
        logout: function() {
            return authObj.$unauth();
        },
        register: function(user) {
            return authObj.$createUser({email: user.email, password: user.password}).then(function(regUser) {
                var ref = new Firebase(FIREBASE_URL+'users/' + regUser.uid);
                var firebaseUser = $firebaseObject(ref);
                firebaseUser.date = Firebase.ServerValue.TIMESTAMP;
                firebaseUser.regUser = regUser.uid;
                firebaseUser.firstname =user.firstname;
                firebaseUser.lastname = user.lastname;
                firebaseUser.email = user.email;
                firebaseUser.$save();
            });
        },
        requireAuth: function() {
            return authObj.$requireAuth();
        }, //require Authentication

        waitForAuth: function() {
            return authObj.$waitForAuth();
        } //Wait until user is Authenticated
    }; // MyObject

    $rootScope.signedIn = function() {
        return myObject.signedIn();
    }

    return myObject;
});