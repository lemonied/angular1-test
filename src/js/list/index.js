(function() {
  angular.module('App.views.list', ['App.directives.count', 'ui.bootstrap'])
    .controller('App.views.list.ctrl', [
      '$scope',
      function($scope) {
        $scope.text = 'list view';
        $scope.page = {
          total: 100,
          size: 10
        }
        $scope.onClick = function(e) {
          $scope.pagCtx.setPage(5);
        }
        $scope.onSend = function(e) {
          console.log(e);
        }
        $scope.getPag = function(ctx) {
          $scope.pagCtx = ctx;
        }
        $scope.onPageChange = function(pageNum) {
          console.log(pageNum);
        }
      }
    ])
})();
