'use strict'

app.controller('TracksCtrl', function ($scope, SCapiService) {
    var endpoint = 'me/tracks'
        , params = 'limit=33';

    $scope.title = 'Tracks';
    $scope.data = '';
    $scope.busy = false;

    SCapiService.get(endpoint, params)
                .then(function(data) {
                    $scope.data = data;
                }, function(error) {
                    console.log('error', error);
                });

    $scope.loadMore = function() {
        if ( $scope.busy ) {
            return;
        }
        $scope.busy = true;

        SCapiService.getNextPage()
            .then(function(data) {
                for ( var i = 0; i < data.length; i++ ) {
                    $scope.data.push( data[i] )
                }
                $scope.busy = false;
            }, function(error) {
                console.log('error', error);
            });
    };

});