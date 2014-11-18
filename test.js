$ = window.$ = require("jquery");
require("angular");

angular
  .module('App', [])
  .controller('MainCtrl', function($scope) {
    $scope.what = "World";
  })

.directive('outer', function() {
  return {
    restrict: 'E',
    scope: {
      some: '@'
    },
    templateUrl: 'outer.html'
  }
})

.directive('embolden', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { wahteva: '@?' },
    templateUrl: 'embolden.html'
  }
})

  .directive('multiSlot', function() {
    return {
      transclude: true,
      controller: function() {
        this.slots = {}
      },
      link: function(scope, el, attrs, ctrl, transclude) {
        transclude(function(clone) {
          console.log([el, clone]);
          $(el).append(clone);
        });
      }
    }
  })

  .directive('forSlot', function() {
    return {
      // transclude: true,
      require: '^^multiSlot',
      link: function(scope, el, attrs, ctrl, transclude) {
        ctrl.slots[attrs.forSlot].append(el);
        // transclude(function(clone) {
        //   ctrl.slots[attrs.forSlot].append(clone);
        //   el.remove();
        // });
      }
    }
  })

  .directive('slot', function() {
    return {
      require: '^^multiSlot',
      link: function(scope, el, attrs, ctrl) {
        ctrl.slots[attrs.slot] = el;
      }
    }
  })
