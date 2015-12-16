'use strict';

angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question/:path',
        templateUrl: 'app/question/question.html'
      })
  })
  .controller('QuestionController', function($scope, $rootScope, hotkeys, $state, QuestionContentFactory, $platform){
    $scope.showCover = false;

    $scope.path = $state.params.path;
    $scope.dataQuestion = {};



    $scope.steps = {
      step1: {
        show: true,
        step: 'step1',
        content: ''
      },
      step2: {
        show: false,
        step: 'step2',
        content: ''
      },
      step3: {
        show: false,
        step: 'step3',
        content: ''
      }

    };






    $scope.getData = function(){
      $platform.returnData()
        .then(function(resp){
          $scope.dataQuestion = resp[$scope.path];
          $scope.generateContent();
        })
    };
    $scope.getData();


    //
    // Перехватываем события
    //

    $rootScope.$on('showCowerBackground', function(){
      if($scope.showCover){
        $scope.showCover = false;
      } else {
        $scope.showCover = true;
      }
    });

    $rootScope.$on('goFistStep', function(){
      for(var item in $scope.steps){
        $scope.steps[item].show = false;
      }
      $scope.steps.step1.show = true;

    });

    $rootScope.$on('goSecondStep', function(){
      for(var item in $scope.steps){
        $scope.steps[item].show = false;
      }
      $scope.steps.step2.show = true;
    });

    $rootScope.$on('goThirdStep', function(){
      for(var item in $scope.steps){
        $scope.steps[item].show = false;
      }
      $scope.steps.step3.show = true;
    });

    $rootScope.$on('goExitQuestion', function(){
      for(var item in $scope.steps){
        $scope.steps[item].show = false;
      }
      $state.go('main')
    });

    $scope.generateContent = function(){
      for(var item in $scope.steps){
        var factoryResp = QuestionContentFactory.generateContent($scope.path, $scope.steps[item].step, $scope.dataQuestion.questionType, $scope.dataQuestion.question, $scope.dataQuestion.answer);

        $scope.steps[item].content = factoryResp;

        console.log($scope.steps)
      }
    };


  })
  .factory('QuestionContentFactory', function($sce){
    var _this = this;

    return{
      generateContent: function(path, step, typeContent, dataQuestion, dataAnswer){

        if(step === 'step1' && typeContent === 'text'){

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">Текстовый вопрос</p> ' +
            '</div>');

          return returnData;
        } else if(step === 'step2' && typeContent === 'text') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">'+dataQuestion+'</p> ' +
            '</div>');

          return returnData;

        } else if (step === 'step3'){

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">'+dataAnswer+'</p> ' +
            '</div>');

          return returnData;
        }
      }
    }

  });


