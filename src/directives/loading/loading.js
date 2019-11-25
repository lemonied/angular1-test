(function() {
  angular.module('App.directives.loading', [])
    .directive('loading', [function() {
      return {
        restrict: 'A',
        templateUrl: 'templates/loading.html',
        scope: {
          ngModel: '=', // 将ngModel同指定对象绑定
          title: '@' // 储存与fromName相关联的字符串
        },
        controller: [
          '$scope',
          function($scope) {
            $scope.text = '加载中...';
          }
        ]
      }
    }]);
})();
