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

  SetOrbit = function(Position0, Position1) {
    var deltaX = Position1.X - Position0.X;
    var deltaY = Position1.Y - Position0.Y;
    var deltaZ = Position1.Z - Position0.Z;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    var Curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 2);
    var CurvePath = new THREE.Path(Curve.getPoints(50));
    var CurveGeometry = CurvePath.createPointsGeometry(50);
    var CurveMaterial = new THREE.LineBasicMaterial({color: 0x004890});
    var CurveEllipse = new THREE.Line(CurveGeometry, CurveMaterial);
    CurveEllipse.rotation.x = 90 * (Math.PI / 180);
    CurveEllipse.position.set(Position0.X, Position0.Y, Position0.Z);
    return CurveEllipse;
  };

  this.MercuryOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:200});
  this.VenusOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:400});
  this.EarthOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:600});
  this.MoonOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:200});
  this.MarsOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:800});
  this.JupiterOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1000});
  this.SaturnOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1200});
  this.UranusOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1400});
  this.NeptuneOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1600});
  this.PlutoOrbit = SetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1400});
})
