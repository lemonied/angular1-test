(function() {
  angular.module('App.views.table', ['ui.bootstrap', 'App.directives.modal'])
    .controller('App.views.table.ctrl', [
      '$scope',
      '$state',
      '$timeout',
      function($scope, $state, $timeout) {
        $scope.text = 'table';
        $scope.visiable = false;
        $scope.getModal = function(modalCtx) {
          $scope.modalCtx = modalCtx;
        }
        $scope.openModal = function() {
          $scope.modalCtx.open().result.then(function(res) {
            console.log(res);
          });
        }
      }
    ]);
})();
