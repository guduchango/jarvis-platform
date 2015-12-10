JarvisPlatform.controller('LotsController', ['$scope', 'LotsService', function ($scope, LotsService) {

    $scope.lotParams = {};

    $scope.searchLots = function()
    {
        $('#searchLots').button('loading');
        LotsService.getLots($scope.lotParams).success(function(data){
            $('#searchLots').button('reset');
            $scope.loading = 0;
            $scope.NoResults = 1;
            if(data.meta.pagination.count > 0)
            {
                $scope.NoResults = 0;
                $scope.hasMoreResults = false;
                if(data.meta.pagination.links.next !== undefined)
                {
                    $scope.hasMoreResults = true;
                    $scope.nextPage = data.meta.pagination.current_page + 1;
                    $scope.prevPage = data.meta.pagination.current_page - 1;
                }
                $scope.current_page = data.meta.pagination.current_page;
                $scope.total_pages = data.meta.pagination.total_pages;
                $scope.total = data.meta.pagination.total;
            }else{
                $scope.total = 0;
            }
            $scope.lots = data.data;
        }).error(function(data, status){
            $('#searchLots').button('reset');
            HandleErrorResponse(data, status);
        });
    }

}]);
/** Services **/
JarvisPlatform.factory('LotsService', ['$http', function ($http) {

    service = {
        getLots : function(parameters)
        {
            return $http({
                method: 'post',
                url: GLOBALS.site_url+'/api/fut/inv/lots/search',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: parameters
            });
        }
    };
    return service;
}]);