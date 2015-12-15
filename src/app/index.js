'use strict';

angular.module('jeopardy', ['ui.router', 'cfp.hotkeys'])
  .constant('settingsConst', {
    JSONUrl: 'app/data.json'
  })
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  })
  .controller('EventController', function(hotkeys, $scope, $rootScope){


    hotkeys.add({
      combo: 'q',
      callback: function () {
        $rootScope.$broadcast('showCowerBackground');
      }
    });
  });
