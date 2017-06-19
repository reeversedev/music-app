var app = angular.module('musicApp', []);

app.controller('music', function ($scope, $http) {
    $scope.tracks = [];
    $http.get('http://104.197.128.152:8000/v1/tracks')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });
});
app.controller('editGenres', function ($scope, $http) {
    $scope.genres = [];
    $scope.add_genre = "";
    $http.get('http://104.197.128.152:8000/v1/genres?page=60')
        .then(function (response) {
            $scope.genres = response.data.results;
        });
    $scope.add = function (event) {
        if (event.keyCode == 13) {
            $http.post('http://104.197.128.152:8000/v1/genres', { name: $scope.add_genre })
                .then(function (data) {
                    $scope.genres = data;
                    //console.log($scope.add_genre);
                    $scope.add_genre = '';
                });
            $http.get('http://104.197.128.152:8000/v1/genres?page=60')
                .then(function (response) {
                    $scope.genres = response.data.results;
                });
        }
    }
});
