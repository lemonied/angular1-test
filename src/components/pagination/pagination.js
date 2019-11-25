(function() {
  angular.module('App.components.pagination', ['ui.bootstrap'])
    .component('myPagination', {
      templateUrl: 'components/pagination/pagination.html',
      transclude: {
        'title': '?transcludeTitle',
        'body': '?transcludeBody'
      },
      bindings: {
        page: '<',
        initPage: '<',
        getCtx: '<',
        onChange: '<'
      },
      controller: [
        '$scope',
        function($scope) {
          var top = $scope.$ctrl;

          $scope.size = 0;
          $scope.total = 0;

          if (typeof top.getCtx === 'function') {
            top.getCtx(this);
          }
          $scope.pageChanged = function() {
            // page changed
          }
          this.$onInit = function(o) {
            $scope.currentPage = top.initPage || 1;
            setProps(top.page);
          }
          this.$onChanges = function(o) {
            setProps(o.page);
          }
          this.setPage = function(currentPage) {
            $scope.currentPage = currentPage;
          }
          $scope.$watch('currentPage', function(n, o) {
            if (n !== o && typeof top.onChange === 'function') {
              top.onChange($scope.currentPage);
            }
          });
          function setProps(o) {
            if (o) {
              $scope.total = o.total;
              $scope.size = o.size;
            }
          }
        }
      ]
    });
})();