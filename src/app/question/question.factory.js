'use strict';

angular.module('jeopardy')
  .factory('QuestionContentFactory', function ($sce) {


    return {
      generateContent: function (path, step, typeContent, dataQuestion, dataAnswer) {

        if (step === 'step1' && typeContent === 'text') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">Текстовый вопрос</p> ' +
            '</div>');

          return returnData;
        } else if (step === 'step2' && typeContent === 'text') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + dataQuestion + '</p> ' +
            '</div>');

          return returnData;

        } else if (step === 'step3') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + dataAnswer + '</p> ' +
            '</div>');

          return returnData;
        }
      }
    }

  });
