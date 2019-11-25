(function() {
  angular.module('App.views.form', ['App.directives.validate'])
  .controller('App.views.form.ctrl', [
    '$scope',
    function($scope) {
      var self = this
      $scope.formData = {
        username: '',
        password: ''
      }
      $scope.rules = {
        username: [function(value, cb) {
          if (/^.{5,8}$/.test(value)) {
            cb()
          } else {
            cb(new Error('长度为5-8个字符'))
          }
        }]
      }
      $scope.onSubmit = function(e) {
        self.formInstace.validate().then(function(data) {
          console.log(data)
        })
      }
      $scope.getForm = function(e) {
        self.formInstace = e
      }
    }
  ])
})();