'use strict';

angular.module('jeopardy', ['ui.router', 'cfp.hotkeys'])
  .constant('settingsConst', {
    JSONUrl: 'app/data.json'
  })
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  })
  .controller('EventController', function(hotkeys, $scope, $rootScope, $log){

    $scope.showCover = true;

    $rootScope.$on('showCowerBackground', function(){
      if($scope.showCover){
        $scope.showCover = false;
      } else {
        $scope.showCover = true;
      }
    });

    // Показать/скрыть картинку с логотипом программы
    hotkeys.add({
      combo: 'q',
      callback: function () {
        console.log('q');
        $rootScope.$broadcast('showCowerBackground');

      }
    });

    // Перейти на первый шаг вопроса
    hotkeys.add({
      combo: 'a',
      callback: function () {
        console.log('a');
        $rootScope.$broadcast('goFistStep');
      }
    });

    // Перейти на второй шаг вопроса
    hotkeys.add({
      combo: 's',
      callback: function () {
        console.log('s');
        $rootScope.$broadcast('goSecondStep');
      }
    });

    // Перейти выйти из вопроса, перейти на главную и записать изменения данных в LocalStorage
    hotkeys.add({
      combo: 'd',
      callback: function () {
        $rootScope.$broadcast('goExitQuestion');
      }
    });


  });
