angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives', 'starter.services'])

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
