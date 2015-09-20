'use strict';

(function(){

  function NotificationFactory($http, appSettings) {

    var deactivateNotification = function(notificationId){
      var notification = { notification: {  }  };
      return $http.patch(appSettings.apiUrl + '/notifications/' + notificationId + '/deactivate', notification);
    }

    return {
      deactivateNotification: deactivateNotification
    };

  };

  angular.module('frontendApp').factory('NotificationFactory', NotificationFactory);

  NotificationFactory.$inject = ['$http', 'appSettings'];

})();
