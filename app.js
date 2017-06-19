var app = angular.module('musicApp', []);

app.controller('music', function ($scope, $http) {
    $scope.checkObject = function (obj) {
        return angular.equals({}, obj);
    };
    $http.get('http://104.197.128.152:8000/v1/tracks')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });
});
