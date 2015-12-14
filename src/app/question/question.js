'use strict';

angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question/:path',
        templateUrl: 'app/question/question.html'
      })
  });
