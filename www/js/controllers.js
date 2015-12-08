angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal) {
  $scope.Data = {
    StereoEffect: false,
    Landscape: false
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

  function readDeviceOrientation() {
    if (Math.abs(window.orientation) === 90) {
      // Landscape
    } else {
      // Portrait
    }
  };
  window.addEventListener('orientationchange', readDeviceOrientation, false);

})
