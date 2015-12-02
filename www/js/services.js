angular.module('starter.services', [])

.service('Planets', function () {

  this.baseURL = "img/planets/";

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

  SetOrbit = function(Distance) {
    var distance = Math.sqrt(Distance * Distance);
    var Curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 2);
    var CurvePath = new THREE.Path(Curve.getPoints(50));
    var CurveGeometry = CurvePath.createPointsGeometry(50);
    var CurveMaterial = new THREE.LineBasicMaterial({color: 0x004890});
    var CurveEllipse = new THREE.Line(CurveGeometry, CurveMaterial);
    CurveEllipse.rotation.x = 90 * (Math.PI / 180);
    return CurveEllipse;
  };

  this.Properties = {
    Starfield: {
      Size: 20000
    },
    Sun: {
      Size: 200,
      Distance: 30,
      Speed: {
        Rotation: 0.001,
        Translation: 3
       }
    },
    Mercury: {
      Size: 100,
      Distance: 300,
      Speed: {
        Rotation: 0.005,
        Translation: 1.607
       }
    },
    Venus: {
      Size: 100,
      Distance: 400,
      Speed: {
        Rotation: 0.005,
        Translation: 1.174
       }
    },
    Earth: {
      Size: 100,
      Distance: 600,
      Speed: {
        Rotation: 0.005,
        Translation: 1
       }
    },
    EarthMoon: {
      Size: 50,
      Distance: 200,
      Speed: {
        Rotation: 0.005,
        Translation: 5
       }
    },
    Mars: {
      Size: 100,
      Distance: 800,
      Speed: {
        Rotation: 0.005,
        Translation: 0.802
       }
    },
    Jupiter: {
      Size: 100,
      Distance: 1000,
      Speed: {
        Rotation: 0.005,
        Translation: 0.434
       }
    },
    Saturn: {
      Size: 100,
      Distance: 1200,
      Speed: {
        Rotation: 0.005,
        Translation: 0.323
       }
    },
    Uranus: {
      Size: 100,
      Distance: 1400,
      Speed: {
        Rotation: 0.005,
        Translation: 0.228
       }
    },
    Neptune: {
      Size: 100,
      Distance: 1600,
      Speed: {
        Rotation: 0.005,
        Translation: 0.182
       }
    },
    Pluto: {
      Size: 100,
      Distance: 1800,
      Speed: {
        Rotation: 0.005,
        Translation: 0.159
       }
    }
  };
  this.Starfield = {
    Sphere: SetPlanet(this.Properties.Starfield.Size)
  };
  this.Sun = {
    Sphere: SetPlanet(this.Properties.Sun.Size)
  };
  this.Mercury = {
    Sphere: SetPlanet(this.Properties.Mercury.Size),
    Orbit: SetOrbit(this.Properties.Mercury.Distance)
  };
  this.Venus = {
    Sphere: SetPlanet(this.Properties.Venus.Size),
    Orbit: SetOrbit(this.Properties.Venus.Distance)
  };
  this.Earth = {
    Sphere: SetPlanet(this.Properties.Earth.Size),
    Orbit: SetOrbit(this.Properties.Earth.Distance)
  };
  this.EarthMoon = {
    Sphere: SetPlanet(this.Properties.EarthMoon.Size),
    Orbit: SetOrbit(this.Properties.EarthMoon.Distance)
  };
  this.Mars = {
    Sphere: SetPlanet(this.Properties.Mars.Size),
    Orbit: SetOrbit(this.Properties.Mars.Distance)
  };
  this.Jupiter = {
    Sphere: SetPlanet(this.Properties.Jupiter.Size),
    Orbit: SetOrbit(this.Properties.Jupiter.Distance)
  };
  this.Saturn = {
    Sphere: SetPlanet(this.Properties.Saturn.Size),
    Orbit: SetOrbit(this.Properties.Saturn.Distance),
    Ring: SetRing(this.Properties.Saturn.Size)
  };
  this.Uranus = {
    Sphere: SetPlanet(this.Properties.Uranus.Size),
    Orbit: SetOrbit(this.Properties.Uranus.Distance),
    Ring: SetRing(this.Properties.Uranus.Size)
  };
  this.Neptune = {
    Sphere: SetPlanet(this.Properties.Neptune.Size),
    Orbit: SetOrbit(this.Properties.Neptune.Distance)
  };
  this.Pluto = {
    Sphere: SetPlanet(this.Properties.Pluto.Size),
    Orbit: SetOrbit(this.Properties.Pluto.Distance)
  };
})
