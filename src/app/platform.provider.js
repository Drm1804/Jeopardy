'use strict';

angular.module('jeopardy')
  .provider('$platform', function () {
    return {
      $get: function ($http, settingsConst, $q) {
        return {
          returnData: function () {
            var dfd = $q.defer();

            $http.get(settingsConst.JSONUrl)
              .success(
              function(resp){
                dfd.resolve(resp);
              });

            return dfd.promise;
          }
        }
      }
    }
  }
);
