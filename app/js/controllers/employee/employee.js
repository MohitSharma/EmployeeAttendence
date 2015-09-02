myApp.controller('EmployeesController',
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, Authentication,
             CountEmployees, FIREBASE_URL, $modal) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);
        
        
        
        

        auth.$onAuth(function(authUser) {
            if (authUser) {
                var employeesRef = new Firebase(FIREBASE_URL + '/users/' +
                    $rootScope.currentUser.$id + '/employees');
                var employeesInfo = $firebaseArray(employeesRef);
                employeesInfo.$loaded().then(function(data) {
                    $scope.employees = data;
                }); //make sure meetings data is loaded

                $scope.deleteEmployee = function(key) {
                    if (confirm("Are you sure to delete?")) {
                        employeesInfo.$remove(key);
                    }
                }; //deleteEmployee
                
                
                $scope.open = function (key) {
                    var modalInstance = $modal.open({
                      animation: true,
                      templateUrl: 'views/employee/save.html',
                      controller: 'SaveEmployeeCtrl',
                      size: 'md',
                      resolve: {
                        employeesInfo: function () {
                            return employeesInfo;
                        },
                        key: function() {
                            return key;
                        }
                      }
                    });
                
                    modalInstance.result.then(function (selectedItem) {
                      $scope.selected = selectedItem;
                    }, function () {
                      console.log('Modal dismissed at: ' + new Date());
                    });
                  };
                                
            }
        });
    }); //EmployeesController