myApp.controller('MeetingsController', function($scope, $firebase, $firebaseObject, $firebaseArray) {
    var ref = new Firebase('https://mohitsharma.firebaseio.com/meetings');
    var meetings = $firebaseArray(ref);
    $scope.meetings = meetings;

    $scope.addMeeting = function() {
        meetings.$add({
            name: $scope.meetingname,
            date: Firebase.ServerValue.TIMESTAMP
        }).then(function() {
            $scope.meetingname = '';
        });
    };

    $scope.deleteMeeting = function(key) {
        meetings.$remove(key);
    };

});