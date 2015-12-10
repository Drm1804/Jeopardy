angular.module('jeopardy')
  .config(function($stateProvider){
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'app/main/main.html'
      })
  })
  .controller('MainController', function($scope){

  });
