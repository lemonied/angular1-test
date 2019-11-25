(function() {
  angular.module('App.directives.validate', [])
    .directive('validForm', function() {
      return {
        restrict: 'AE',
        scope: { rules: '&', onRef: '&' },
        controller: [
          '$scope',
          '$q',
          function($scope, $q) {
            /*
            * this.rules: {[prop: string]: (value, cb) => void}[]
            * this.validators: (() => Promise<{[prop: string]: string}>)[]
            * this.validate: () => Promise<{[props: string]: string}>
            */
            var self = this
            this.rules = $scope.rules()
            this.validators = []
            this.validate = function() {
              return $q.all(self.validators.map(function(item) {
                return item()
              })).then(function(vals) {
                var defer = $q.defer()
                var ret = vals.reduce(function(a, b) {
                  return Object.assign(a, b)
                }, {})
                defer.resolve(ret)
                return defer.promise
              })
            }
            if (typeof $scope.onRef() === 'function') {
              $scope.onRef()(this)
            }
          }
        ]
      }
    })
    .directive('validItem', ['$compile', function($compile) {
      return {
        restrict: 'AE',
        scope: {},
        replace: true,
        transclude: true,
        template: '<div><div ng-transclude></div><span class="err-msg">{{errMsg}}</span></div>',
        controller: [
          '$scope',
          '$q',
          function($scope, $q) {
            /*
            * this.ele: jQlite
            * this.validate => Promise<{[prop: string]: string}>
            * this.name: string
            * this.value: string
            */
            var self = this
            $scope.errMsg = ''  
            this.validate = $scope.validate = function() {
              var defer = $q.defer()
              var value = self.value
              var index = 0
              process()
              function process() {
                var rules = $scope.rules[self.name] || []
                if (index >= rules.length) {
                  handleErrMsg()
                  var retVal = {}
                  retVal[self.name] = value
                  return defer.resolve(retVal)
                }
                rules[index](value, function(err) {
                  if (err) {
                    handleErrMsg(err)
                    defer.reject(err)
                  } else {
                    index++
                    process()
                  }
                })
              }
              return defer.promise
            }
            function handleErrMsg(msg) {      
              $scope.errMsg = msg ? msg.message : ''
            }
          }
        ],
        require: ['?^validForm'],
        link: function(scope, ele, attrs, ctrl) {
          ctrl = ctrl[0]
          scope.rules = ctrl.rules
          ctrl.validators.push(scope.validate)
        }
      }
    }])
    .directive('validInput', ['$timeout' ,function($timeout) {
      return {
        require: ['?^validItem'],
        link: function(scope, ele, attrs, ctrl) {
          ctrl = ctrl[0]
          ctrl.ele = ele
          ctrl.name = attrs.name
          ele.on('change', function(e) {
            ctrl.value = e.target.value
          })
          ele.on('blur', function(e) {
            $timeout(function() {
              ctrl.validate()
            })
          })
        }
      }
    }])
})();