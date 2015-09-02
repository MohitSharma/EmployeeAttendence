myApp.controller('SaveEmployeeCtrl', function ($scope, $modalInstance, employeesInfo, key) {
    $scope.label = "Add";
    if (key >= 0) {
        var employee = employeesInfo[key];
        $scope.name = employee.name;
        $scope.code = employee.code;
        $scope.label = "Update";
    }
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.saveEmployee = function() {
        if (key >= 0) {
            employeesInfo[key].name = $scope.name;
            employeesInfo[key].code = $scope.code;
            employeesInfo.$save(key).then(function() {
                $scope.name='';
                $scope.code = '';
                $modalInstance.dismiss('cancel');
            });     
        }
        else {
            employeesInfo.$add({
                name: $scope.name,
                code: $scope.code,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function() {
                $scope.name='';
                $scope.code = '';
                $modalInstance.dismiss('cancel');
            });     
        }
    }; //Save Employee
});