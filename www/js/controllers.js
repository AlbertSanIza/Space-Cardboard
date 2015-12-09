angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal, $ionicPlatform, $cordovaVibration) {
  $scope.Data = {
    StereoEffect: false,
    Landscape: false,
    Move: false
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
    $scope.Data.Move = !$scope.Data.Move;
  };

  function Vibrate(input) {
    $ionicPlatform.ready(function() {
      $cordovaVibration.vibrate(input);
    });
  };

  function readDeviceOrientation() {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
      $scope.Data.Landscape = true;
      $scope.$apply();
    } else {
      // Portrait
      $scope.Data.StereoEffect = false;
      $scope.Data.Landscape = false;
      $scope.$apply();
    }
  };
  window.addEventListener('orientationchange', readDeviceOrientation, false);

})
