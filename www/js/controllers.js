angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal, $ionicPlatform, $cordovaVibration) {
  $scope.Data = {
    stereoEffect: false,
    landscapeMode: false,
    moveStarFighter: false,
    planetsSpeed: 1
  };

  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });
  $scope.openSettingsModal = function() {
    $scope.settingsModal.show();
  };
  $scope.closeSettingsModal = function() {
    $scope.settingsModal.hide();
  };

  $scope.Move = function() {
    Vibrate(50);
    $scope.Data.moveStarFighter = !$scope.Data.moveStarFighter;
  };

  $scope.planetVibrate = function() {
    Vibrate(50);
  };

  function Vibrate(input) {
    $ionicPlatform.ready(function() {
      if(ionic.Platform.isWebView()) {
        $cordovaVibration.vibrate(input);
      }
    });
  };

  function readDeviceOrientation() {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      Vibrate(50);
      $scope.Data.landscapeMode = true;
      $scope.$apply();
    } else {
      // Portrait
      Vibrate(50);
      $scope.Data.landscapeMode = false;
      $scope.Data.stereoEffect = false;
      $scope.Data.moveStarFighter = false;
      $scope.$apply();
    }
  };
  window.addEventListener('orientationchange', readDeviceOrientation, false);

})
