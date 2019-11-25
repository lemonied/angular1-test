(function() {
  angular.module('App.directives.modal', ['ui.bootstrap'])
    .directive('cModal', 
      function() {
        return {
          restrict: 'A',
          templateUrl: 'directives/modal/modal.html',
          scope: {
            ngModel: '=', // 将ngModel同指定对象绑定
            getCtx: '&', // 将引用传递给这个方法
            title: '@' // 储存与fromName相关联的字符串
          },
          controller: [
            '$scope',
            '$uibModal',
            '$q',
            function($scope, $uibModal, $q) {
              var self = this;
              var modalInstance;
              function open() {
                modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'directives/modal/form.html',
                  controller: formCtrl,
                  resolve: {
                    forms: function () {
                      return 'resolve'
                    }
                  }
                });
                return modalInstance;
              }
              this.open = open;
              this.cancel = function() {
                modalInstance && modalInstance.dismiss('cancel');
              }
              if (typeof $scope.getCtx() === 'function') {
                $scope.getCtx()(this);
              }
            }
          ]
        }
      });
  var formCtrl = [
    '$scope',
    '$uibModalInstance',
    'forms',
    function($scope, $uibModalInstance, forms) {
      console.log(forms);
      $scope.onClose = function() {
        $uibModalInstance.close('result: ' + forms);
      }
    }
  ]
})();