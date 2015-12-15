'use strict';

angular.module('jeopardy', ['ui.router', 'cfp.hotkeys'])
  .constant('settingsConst', {
    JSONUrl: 'app/data.json'
  })
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  })
  .controller('EventController', function(hotkeys, $scope, $rootScope){


    // Показать/скрыть картинку с логотипом программы
    hotkeys.add({
      combo: 'q',
      callback: function () {
        $rootScope.$broadcast('showCowerBackground');
      }
    });

    // Перейти на первый шаг вопроса
    hotkeys.add({
      combo: 'a',
      callback: function () {
        $rootScope.$broadcast('goFistStep');
      }
    });

    // Перейти на второй шаг вопроса
    hotkeys.add({
      combo: 's',
      callback: function () {
        $rootScope.$broadcast('goSecondStep');
      }
    });

    // Перейти на третий шаг вопроса
    hotkeys.add({
      combo: 'd',
      callback: function () {
        $rootScope.$broadcast('goThirdStep');
      }
    });

    // Перейти на четвертый шаг вопроса
    hotkeys.add({
      combo: 'f',
      callback: function () {
        $rootScope.$broadcast('goFourStep');
      }
    });

    // Перейти выйти из вопроса, перейти на главную и записать изменения данных в LocalStorage
    hotkeys.add({
      combo: 'g',
      callback: function () {
        $rootScope.$broadcast('goExitQuestion');
      }
    });

  });
