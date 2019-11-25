(function() {
  angular.module('App.views.home', ['App.directives.loading'])
    .controller('app.home', [
      '$scope',
      function($scope) {
        $scope.test = 'hello angular';
      }
    ]);
})();
