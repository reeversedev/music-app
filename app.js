var app = angular.module('musicApp', []);

app.controller('music', function ($scope, $http) {
    $scope.tracks = [];
    $http.get('http://104.197.128.152:8000/v1/tracks')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });
});
app.controller('addGenres', function ($scope, $http) {
    $scope.genres = [];
    $scope.add_genre = "";
    $http.get('http://104.197.128.152:8000/v1/genres?page=61')
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
            $http.get('http://104.197.128.152:8000/v1/genres?page=61')
                .then(function (response) {
                    $scope.genres = response.data.results;
                });
        }
    }
});
app.controller('addTrack', function ($scope, $http) {
    $scope.tracks = [];
    $scope.track = {
        title: '',
        rating: 0,
        genres: function (data) {
            [].push.call(this, data);
        },
    };
    $http.get('http://104.197.128.152:8000/v1/tracks?page=48')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });
    $scope.add = function (event) {
        if (event.keyCode == 13) {
            $http.post('http://104.197.128.152:8000/v1/tracks', $scope.track)
                .then(function (data) {
                    $scope.track = {};
                });
        }
    }
});
app.controller('editGenres', function ($scope, $http) {
    $scope.add = function (event) {
        if (event.keyCode == 13) {
            $http.get('http://104.197.128.152:8000/v1/genres/' +$scope.genre_id)
                .then(function (response) {
                    $scope.genres = response.data;
                });
        }
    }

})

