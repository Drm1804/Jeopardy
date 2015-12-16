'use strict';

angular.module('jeopardy')
  .provider('$platform', function () {
    return {
      $get: function ($http, settingsConst, $q, $localStorage) {


        return {
          returnDataFromJson: function () {
            var dfd = $q.defer();

            $http.get(settingsConst.JSONUrl)
              .success(
              function (resp) {
                dfd.resolve(resp);
              });

            return dfd.promise;
          },


          returnDataFromLS: function () {
            return $localStorage.dataQuestion;
          },

          returnDataAnsweredFromLS: function () {
            return $localStorage.dataAnswered;
          },

          writeDataToLS: function (data) {
            $localStorage.dataQuestion = data;
          },

          writeDataAnsweredToLS: function (data) {
            $localStorage.dataAnswered = data;
          },

          fistStart: function (data) {


            // Еали data пустая, значи вопрос на чтение
            if (data == undefined) {
              console.log($localStorage.fistStart)
              if ($localStorage.fistStart == undefined || $localStorage.fistStart == true) {

                // Помечаем, что первый запуск состоялся
                $localStorage.fistStart = false;

                // Возвращем что это был первый запуск

                return true;
              } else {
                // Возвращем что это НЕ был первый запуск

                return false;
              }
            } else {

              if (typeof (data) === 'boolean') {
                // Записываем данные из data
                $localStorage.fistStart = data;
              } else {
                throw "data is not a boolean type"
              }
            }
          },

          returnDataGame: function () {
            var _this = this;
            var dfd = $q.defer();
            // Спрашиваем первый ли это запуск?

            if (_this.fistStart()) {

              //**************
              // Первый запуск
              //**************


              console.log('Первый запуск')
              _this.returnDataFromJson()
                .then(function (resp) {
                  var tempArr = {};
                  var dataToSendCtrl = {};

                  _this.writeDataToLS(resp);

                  for (var item in resp) {
                    tempArr[item] = false;
                    dataToSendCtrl[item] = resp[item];
                    dataToSendCtrl[item].answered = false;
                  }

                  _this.writeDataAnsweredToLS(tempArr);

                  dfd.resolve(dataToSendCtrl)
                });
            } else {
              //********************
              // Последующие запуски
              //********************

              var data = _this.returnDataFromLS();
              var dataAnswered = _this.returnDataAnsweredFromLS();
              var dataToSendCtrl = {};


              console.log(dataAnswered)
              for (var item in data) {
                dataToSendCtrl[item] = data[item];
                dataToSendCtrl[item].answered = dataAnswered[item];
              }



              dfd.resolve(dataToSendCtrl);
            }
            return dfd.promise;
          }

        }
      }
    }
  }
);
