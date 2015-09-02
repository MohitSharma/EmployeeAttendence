myApp.factory('Alert', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var dataFactory = {},
                timeOut;
            $rootScope.alerts = [];
            // Create alert message
            dataFactory.success = function(message) {
                $rootScope.alerts.push({type: 'success', msg: message});
            };
            
            dataFactory.error = function(message) {
                $rootScope.alerts.push({type: 'danger', msg: message});
            };
            
            return dataFactory;
        }
    ]);