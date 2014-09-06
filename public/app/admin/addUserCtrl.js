app.controller('AddUserCtrl', function($scope, $location, auth, notifier) {
    $scope.addUser = function(user) {
        auth.addUser(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    }
})