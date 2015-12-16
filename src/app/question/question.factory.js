'use strict';

angular.module('jeopardy')
  .factory('QuestionContentFactory', function ($sce) {


    return {
      generateContent: function (path, step, typeContent, question, answer, dataContent, prelude) {

        if (step === 'step1') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + prelude + '</p> ' +
            '</div>');

          return returnData;

        } else if (step === 'step2' && typeContent === 'text') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + question + '</p> ' +
            '</div>');

          return returnData;

        } else if (step === 'step2' && typeContent === 'image') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<img class="question-img" src="' + dataContent + '"/> ' +
            '</div>');

          return returnData;

        } else if (step === 'step2' && typeContent === 'video') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<video src="' + dataContent + '" width="720" height="540" autoplay controls />' +
            '</div>');

          return returnData;
        } else if (step === 'step2' && typeContent === 'audio') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<audio src="'+dataContent+'" autoplay controls></audio>' +
            '</div>');

          return returnData;
        } else if (step === 'step2' && typeContent === 'performance' ) {

          if(dataContent != undefined){
            var returnData = $sce.trustAsHtml('<div class="step-cell">' +
              '<audio src="'+dataContent+'" autoplay controls></audio>' +
              '</div>');

            return returnData;
          } else {
            var returnData = $sce.trustAsHtml('<div class="step-cell">' +
              '<p class="question-text">' + question + '</p> ' +
              '</div>');

            return returnData;
          }


        }
        else if (step === 'step3') {

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + question + '</p> ' +
            '</div>');

          return returnData;

        }
        else if (step === 'step4') {


          console.log(answer);

          var returnData = $sce.trustAsHtml('<div class="step-cell">' +
            '<p class="question-text">' + answer + '</p> ' +
            '</div>');

          return returnData;
        }
      }
    }

  });
