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
                var ref = new Firebase(FIREBASE_URL+'users');
                var firebaseUsers = $firebaseArray(ref);

                var userInfo = {
                    date : Firebase.ServerValue.TIMESTAMP,
                    regUser : regUser.uid,
                    firstname: user.firstname,
                    lastname : user.lastname,
                    email: user.email
                }; //user info
                firebaseUsers.$add(userInfo);
            });
        }
    }; // MyObject

    return myObject;
});