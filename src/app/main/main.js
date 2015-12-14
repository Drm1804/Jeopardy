angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'app/main/main.html'
      })
  })
  .controller('MainController', function ($scope, hotkeys, $platform) {
    $scope.showCover = true;
    $scope.dataQuestion = {};
    hotkeys.add({
      combo: 'q',
      description: 'This one goes to 11',
      callback: function () {
        if ($scope.showCover) {
          $scope.showCover = false;
        } else {
          $scope.showCover = true;
        }
      }
    });

    $scope.getData = function(){
      $platform.returnData()
        .then(function(resp){
          $scope.dataQuestion = resp;
          console.log($scope.dataQuestion);
        })
    };
    $scope.getData();


  });
