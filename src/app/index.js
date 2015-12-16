'use strict';

angular.module('jeopardy', ['ui.router', 'cfp.hotkeys', 'ngStorage'])
  .constant('settingsConst', {
    JSONUrl: 'app/data.json'
  })
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  })
  .controller('EventController', function(hotkeys, $scope, $rootScope, $platform){

    $scope.showCover = true;

    $rootScope.$on('showCowerBackground', function(){
      if($scope.showCover){
        $scope.showCover = false;
      } else {
        $scope.showCover = true;
      }
    });

    $rootScope.$on('hardReset', function(){

      console.log('Hard reset!!!!!!!!!!!!!!!');
      $platform.clearLocalStorageData();
    });

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
        $rootScope.$broadcast('goFourthStep');
      }
    });
    // Перейти выйти из вопроса, перейти на главную и записать изменения данных в LocalStorage
    hotkeys.add({
      combo: 'g',
      callback: function () {
        $rootScope.$broadcast('goExitQuestion');
      }
    });


    // Сбросить весь прогрес игры, и заново загрузить информацию с вопросами
    hotkeys.add({
      combo: 'z+right',
      callback: function () {
        $rootScope.$broadcast('hardReset');
      }
    });

  });
