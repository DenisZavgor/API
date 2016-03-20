/**
 * Created by IlyaLitvinov on 04.03.16.
 */
(function () {
  angular
    .module('levelUpAngular')
    .filter('customFilter', function() {
      return function(item) {
        return item.completed
      }
    })
})();
