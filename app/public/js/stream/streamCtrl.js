'use strict'

app.controller('StreamCtrl', function ($scope, SCapiService) {
    var endpoint = 'me/activities'
        , params = 'limit=33';

    $scope.title = 'Stream';
    $scope.data = '';
    $scope.busy = false;

    SCapiService.get(endpoint, params)
                .then(function(data) {
                    $scope.data = data.collection;
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
                        for ( var i = 0; i < data.collection.length; i++ ) {
                            $scope.data.push( data.collection[i] )
                        }
                        $scope.busy = false;
                    }, function(error) {
                        console.log('error', error);
                    });
    };

});