angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'app/main/main.html'
      })
  })
  .controller('MainController', function ($scope, $rootScope, hotkeys, $platform) {

    $scope.dataQuestion = {};




    $scope.getData = function(){
      $platform.returnData()
        .then(function(resp){
          $scope.dataQuestion = resp;
          console.log($scope.dataQuestion);
        })
    };
    $scope.getData();


  });
