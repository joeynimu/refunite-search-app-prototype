// module
var refuniteSearch = angular.module('refuniteSearch', ['ngRoute', 'ngResource', 'ngAnimate']);
// routers
refuniteSearch.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            //the home page template
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when('/refugees/:id', {
            //the results page template
            templateUrl: 'pages/results.html',
            controller: 'resultsController'
        })
        .when('/home', {
            //the home page template
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        });

});
// service
refuniteSearch.service('searchRefugee', function(){
	this.refugee = '';
    this.singleRefugee = '';
});


// controllers
refuniteSearch.controller('mainController', ['$scope', '$http', 'searchRefugee','$routeParams', function($scope, $http, searchRefugee, $routeParams) {
	//watch for the searched refugee name to make it persistent
	$scope.refugee = searchRefugee.refugee;

	$scope.$watch('refugee', function(){
		searchRefugee.refugee = $scope.refugee;
	});

    $http.get('data/people.json').
    success(function(data, status, headers, config) {
        $scope.people = data.result;
    }).
    error(function(data, status, headers, config) {
        $scope.errMessage = 'Could not load data. Please try again';
    });
    //default displayed refugees = 10
    $scope.totalDisplayed = 8;
    $scope.loadMore = function() {
    	//load more function that increments by +=10
        $scope.totalDisplayed += 10;
    };    
   
}]);

refuniteSearch.controller('resultsController', ['$scope', '$http', '$routeParams','$filter', 'searchRefugee', function($scope, $http, $routeParams, $filter, searchRefugee) {
    $scope.singleRefugee = searchRefugee.singleRefugee;
    $scope.$watch('singleRefugee', function(){
        searchRefugee.singleRefugee = $scope.singleRefugee;
    });    
    //get the data and filter by ID 
    $http.get('data/people.json').
    success(function(data) {
        $scope.refugeeslist = data.result;
        angular.forEach($scope.refugeeslist, function(refugee) {
          if (refugee.id == $routeParams.id) 
            $scope.inviewRefugee = refugee;
        });
        
     
    }).
    error(function(data, status, headers, config) {
        $scope.errMessage = 'Could not load data. Please try again';
    });

   
  
   

   
   
   


}]);

