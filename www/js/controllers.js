angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal) {
  $scope.Data = {
    StereoEffect: false
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
      console.log("Landscape");
    } else {
      // Portrait
      console.log("Portrait");
    }
  };
  window.addEventListener('orientationchange', readDeviceOrientation, false);

})
