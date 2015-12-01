angular.module('starter.services', [])

.service('Planets', function () {

  this.baseURL = "/img/planets/";

  var manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log("Planets - Loading: " + loaded + "/" + total);
    if(loaded == total) {
      console.log("Planets - Load Finished");
    }
  };

  this.Loader = new THREE.TextureLoader(manager);

  SetPlanet = function(r) {
    var Mesh = new THREE.Mesh();
    Mesh.geometry = new THREE.SphereGeometry(r, 32, 32);
    return Mesh;
  };

  SetRing = function(r) {
    var Mesh = new THREE.Mesh();
    Mesh.geometry = new THREE.XRingGeometry(r + 10, r + (r / 2), 50, 6, 0, Math.PI * 2);
    return Mesh;
  };

  SetOrbit = function(r) {
    var Mesh = new THREE.Mesh();
    return Mesh;
  };

  this.Starfield = SetPlanet(20000);
  this.Sun = SetPlanet(100);
  this.Mercury = SetPlanet(100);
  this.Venus = SetPlanet(100);
  this.Earth = SetPlanet(100);
  this.EarthMoon = SetPlanet(50);
  this.Mars = SetPlanet(100);
  this.Jupiter = SetPlanet(100);
  this.Saturn = SetPlanet(100);
  this.SaturnRing = SetRing(100);
  this.Uranus = SetPlanet(100);
  this.UranusRing = SetRing(100);
  this.Neptune = SetPlanet(100);
  this.Pluto = SetPlanet(100);
})

.service('StarFighter', function () {

  this.baseURL = "/obj/planets/";

  var manager = new THREE.LoadingManager();

  manager.onProgress = function (item, loaded, total) {
    console.log("StarFighter - Loading: " + loaded + "/" + total);
    if(loaded == total) {
      console.log("StarFighter - Load Finished");
    }
  };

})
