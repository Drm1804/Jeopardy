angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'app/main/main.html'
      })
  })
  .controller('MainController', function ($scope, $rootScope, hotkeys, $state, $platform) {

    $scope.dataQuestion = {};

    $scope.nextQuestion = function(bool){

      if(!bool){
        var fistNotAnsveredQuestion = '';

        // Ищем первый неотвеченный вопрос

        for(var item in $scope.dataQuestion){
          if(!$scope.dataQuestion[item].answered){
            fistNotAnsveredQuestion = $scope.dataQuestion[item].path;
            break;
          }
        }

        $state.go('question', {path: fistNotAnsveredQuestion});
      }


    };


    $scope.getData = function(){
      $platform.returnDataGame()
        .then(function(resp){
          $scope.dataQuestion = resp;
          console.log($scope.dataQuestion);
        });
    };
    $scope.getData();


  });
