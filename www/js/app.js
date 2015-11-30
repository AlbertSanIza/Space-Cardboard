angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
  });
})

.controller('AppCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal) {

}])

.directive('cardboardGl', [function() {

}]);
