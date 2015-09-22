'use strict';

(function(){

  function NotificationFactory($http, appSettings) {

    var deactivateNotification = function(notificationId){
      var notification = { notification: {  }  };
      return $http.patch(appSettings.apiUrl + '/notifications/' + notificationId + '/deactivate', notification);
    }

    var getMoreNotifications = function(page){
      return $http.get(appSettings.apiUrl + '/notifications?page=' + page);
    }

    return {
      getMoreNotifications: getMoreNotifications,
      deactivateNotification: deactivateNotification
    };

  };

  angular.module('frontendApp').factory('NotificationFactory', NotificationFactory);

  NotificationFactory.$inject = ['$http', 'appSettings'];

})();
