'use strict';

(function(){

  function NotificationFactory($http, appSettings, WatcherFactory) {
    var notifications = [];
    var hasMoreNotifications = true;

    var deactivateNotification = function(notificationId){
      var notification = { notification: {  }  };
      return $http.patch(appSettings.apiUrl + '/notifications/' + notificationId + '/deactivate', notification);
    }

    var _checkNotificationLength = function(response){
      if (response.data.notifications.length === 0) {
        angular.copy(false, hasMoreNotifications)
      }
    }

    var getMoreNotifications = function(page){
      return $http.get(appSettings.apiUrl + '/notifications?page=' + page).then(function(response){
        _checkNotificationLength(response);
        response.data.notifications.forEach(function(notification){
          notifications.push(notification);
        });
      });
    }

    var createNotificationWatchBeat = function(){
      var notificationWatcher = WatcherFactory.createWatcher(appSettings.apiUrl + '/notifications/watch', {
          Authorization: 'Token token=' + simpleStorage.get('gl-user-token'),
          timeout: 60
      });

      notificationWatcher.on('change', function(jNotification){
        var notification = JSON.parse(jNotification);
        notifications.unshift(notification);
        if (notifications.length >= 8) {
          notifications.pop();
        }
      });

      notificationWatcher.on('error', function(e){
        debugger;
        console.log(Date(Date.now()));
      });

      return notificationWatcher;
    }

    var watchForNewNotifications = function(){
      var notificationWatcher = createNotificationWatchBeat();
      setInterval(function(){
        notificationWatcher.close();
        notificationWatcher = null;
        notificationWatcher = createNotificationWatchBeat();
      }, 60000);
    }

    return {
      notifications: notifications,
      hasMoreNotifications: hasMoreNotifications,
      watchForNewNotifications: watchForNewNotifications,
      getMoreNotifications: getMoreNotifications,
      deactivateNotification: deactivateNotification
    };

  };

  angular.module('frontendApp').factory('NotificationFactory', NotificationFactory);

  NotificationFactory.$inject = ['$http', 'appSettings', 'WatcherFactory'];

})();
