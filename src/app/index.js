'use strict';

angular.module('jeopardy', ['ui.router', 'cfp.hotkeys'])
  .constant('settingsConst', {
    JSONUrl: 'app/data.json'
  })
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  });
