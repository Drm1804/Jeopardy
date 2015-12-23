'use strict';

angular.module('jeopardy')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question/:path/:clickPath',
        templateUrl: 'app/question/question.html'
      })
  })
  .controller('QuestionController', function ($scope, $timeout, $rootScope, hotkeys, $state, QuestionContentFactory, $platform) {
    $scope.showCover = false;

    $scope.path = $state.params.path;
    $scope.clickPath = $state.params.clickPath;
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
      },
      step4: {
        show: false,
        step: 'step4',
        content: ''
      }

    };


    $scope.audio = {
      'gong': false
    };


    $scope.getData = function () {
      $platform.returnDataFromJson()
        .then(function (resp) {
          $scope.dataQuestion = resp[$scope.path];
          $scope.generateContent();

        })
    };
    $scope.getData();


    //
    // Перехватываем события
    //

    $rootScope.$on('showCowerBackground', function () {
      if ($scope.showCover) {
        $scope.showCover = false;
      } else {
        $scope.showCover = true;
      }
    });

    $rootScope.$on('goFistStep', function () {
      for (var item in $scope.steps) {
        $scope.steps[item].show = false;
      }
      $scope.steps.step1.show = true;
      $scope.audio.gong = false;
    });

    $rootScope.$on('goSecondStep', function () {
      for (var item in $scope.steps) {
        $scope.steps[item].show = false;
      }
      $scope.steps.step2.show = true;
      $scope.audio.gong = false;
    });

    $rootScope.$on('goThirdStep', function () {
      for (var item in $scope.steps) {
        $scope.steps[item].show = false;
      }
      $timeout(function () {
        $scope.steps.step3.show = true;
      }, 7000);
      $scope.audio.gong = true;
    });

    $rootScope.$on('goFourthStep', function () {
      for (var item in $scope.steps) {
        $scope.steps[item].show = false;
      }
      $scope.steps.step4.show = true;
      $scope.audio.gong = false;
    });

    $rootScope.$on('goExitQuestion', function () {
      for (var item in $scope.steps) {
        $scope.steps[item].show = false;
      }

      $platform.checkClickedItem($scope.clickPath);

      $platform.hideAnsweredQuestion($scope.path);

      $state.go('main')
    });

    $scope.generateContent = function () {
      for (var item in $scope.steps) {
        var factoryResp = QuestionContentFactory.generateContent($scope.path, $scope.steps[item].step, $scope.dataQuestion.questionType, $scope.dataQuestion.question, $scope.dataQuestion.answer, $scope.dataQuestion.dataContent, $scope.dataQuestion.prelude);

        $scope.steps[item].content = factoryResp;

      }

    };


  });


