myApp.controller('AlertCtrl', function($scope, $rootScope) {
  $scope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
}); //Alert Controller