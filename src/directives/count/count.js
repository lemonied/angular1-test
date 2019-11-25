(function() {
  angular.module('App.directives.count', ['ui.bootstrap'])
    .directive('count', 
      function() {
        return {
          restrict: 'A',
          templateUrl: 'templates/count.html',
          scope: {
            ngModel: '=', // 将ngModel同指定对象绑定
            onSend: '&', // 将引用传递给这个方法
            title: '@' // 储存与fromName相关联的字符串
          },
          controller: [
            '$scope',
            function($scope) {
              $scope.counts = 0;
              $scope.singleModel = 0;
              $scope.onClick = function() {
                $scope.counts++;
                var onSend = $scope.onSend
                if (typeof onSend === 'function') {
                  onSend()($scope.counts);
                }
              }
            }
          ]
        }
      });
})();