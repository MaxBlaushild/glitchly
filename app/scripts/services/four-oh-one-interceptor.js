(function(){

  angular.module('frontendApp').factory('fourOhOneInterceptor', ['$location', '$q', function($location, $q) {

      var myInterceptor = {
        responseError: function(response){
          if (response.status === 401) {
          //redirect them back to login page
            simpleStorage.flush();
            $location.path('/try-glitchly');

            return $q.reject(response);
          } else {
            return $q.reject(response);
          }
        }
      };

      return myInterceptor;
  }]);

})();

