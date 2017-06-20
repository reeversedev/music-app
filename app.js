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
    $scope.add_track = '';
    $http.get('http://104.197.128.152:8000/v1/tracks?page=50')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });
    $scope.add = function (event) {
            $http.post('http://104.197.128.152:8000/v1/tracks', {
                title: $scope.add_title,
                rating: $scope.add_rating,
            })
                .then(function (data) {
                    $scope.genres = data;
                    //console.log($scope.add_genre);
                    $scope.add_title = '';
                    $scope.add_rating = '';
                    $scope.add_genre = '';
                }),
            $http.get('http://104.197.128.152:8000/v1/tracks?page=50')
                .then(function (response) {
                    $scope.genres = response.data.results;
                });
        }
});
app.controller('editGenres', function ($scope, $http) {
    $http.get('http://104.197.128.152:8000/v1/genres')
        .then(function (response) {
            $scope.genres = response.data.results;
        })
    $scope.add = function (event) {
        if (event.keyCode == 13) {
            $http.get('http://104.197.128.152:8000/v1/genres/' + $scope.genre_id)
                .then(function (response) {
                    $scope.genres = response.data;
                });
        }
    }
    $scope.submit = function () {
        if ($scope.formName.$valid) {
            $http.post('http://104.197.128.152:8000/v1/genres/' + $scope.genre_id, { name: $scope.genres.name })
                .then(function (data) {
                    $scope.genres.name = data;
                    $scope.genres.id = '';
                    $scope.genres.name = '';
                });
        }
        $http.get('http://104.197.128.152:8000/v1/genres')
            .then(function (response) {
                $scope.genres = response.data.results;
            });
    }
});
app.controller('editTrack', function ($scope, $http) {
    $scope.track = {
        title: '',
        rating: '',
        genre: ''
    };
    $http.get('http://104.197.128.152:8000/v1/tracks')
        .then(function (response) {
            $scope.tracks = response.data.results;
        });

    $scope.search = function () {
        if ($scope.formTrack.$valid) {
            $http.get('http://104.197.128.152:8000/v1/tracks?title=' + $scope.track_title)
                .then(function (response) {
                    $scope.search_tracks = response.data.results;
                })
        }
        $scope.submit = function () {
            if ($scope.formName.$valid) {
                $http.post('http://104.197.128.152:8000/v1/tracks/' + $scope.search_tracks[0].id, { id: $scope.search_tracks[0].id, title: $scope.search_tracks[0].title, rating: $scope.search_tracks[0].rating, })
                    .then(function (data) {
                        $scope.search_tracks = data;
                        console.log('Success!');
                })
            }
        }
    }

});

