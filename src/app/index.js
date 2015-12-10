'use strict';

angular.module('jeopardy', ['ui.router'])
  .config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
  });
