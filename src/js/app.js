(function() {
  angular.module('App', [
    'ui.router',
    'oc.lazyLoad'
  ])
  .service('http', [
      '$http',
      '$q',
      function($http, $q) {
        var http = {};
        http.get = function(url, params) {
          var defer = $q.defer();
          return $http({
              method: 'GET',
              url: url +  '?' + queryStringify(params)
            })
          }
        }
    ])
  .config(Config);

  Config.$inject = [
    '$stateProvider',
    '$ocLazyLoadProvider',
    '$locationProvider'
  ];

  function Config($stateProvider, $ocLazyLoadProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    angular.forEach(window.routes, function(item) {
      $stateProvider.state(item.title, {
        url: item.url,
        templateUrl: item.template,
        resolve: {
          dependencies: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(item.modulePath);
          }]
        }
      });
    });
  }
})();


function queryStringify(obj) {
  if (!obj) return '';
  var arr = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
         arr.push(i + '=' + obj[i])
    }
  }
  return arr.join('&');
}
