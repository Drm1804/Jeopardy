'use strict';

angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question/:path',
        templateUrl: 'app/question/question.html'
      })
  })
  .controller('QuestionController', function($scope, hotkeys, $state, QuestionContentFactory){
    $scope.steps = {
      step1: {
        show: true,
        content: ''
      },
      step2: {
        show: false,
        content: ''
      },
      step3: {
        show: false,
        content: ''
      },
      step4: {
        show: false,
        content: ''
      }
    };
    $scope.path = '';

    $scope.getPath = function(){
      $scope.path = $state.params.path;
    };

    $scope.getPath();

    $scope.generateContent = function(){
      for(var item in $scope.steps){
        QuestionContentFactory.generateContent();
      }
    };
    
    $scope.generateContent();
  })
  .factory('QuestionContentFactory', function(){
    var _this = this;

    return{
      generateContent: function(path, step, typeContent){
        console.log('1')
      }
    }

  });


