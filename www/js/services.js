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
    var CurvePath = new THREE.Path(Curve.getPoints(60));
    var CurveGeometry = CurvePath.createPointsGeometry(60);
    var CurveMaterial = new THREE.LineBasicMaterial({color: 0x004080});
    var CurveEllipse = new THREE.Line(CurveGeometry, CurveMaterial);
    CurveEllipse.rotation.x = 90 * (Math.PI / 180);
    return CurveEllipse;
  };

  this.Distance = function(PlanetA, PlanetB) {
    deltaX = PlanetB.x - PlanetA.x;
    deltaY = PlanetB.y - PlanetA.y;
    deltaZ = PlanetB.z - PlanetA.z;
    distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    return distance;
  };

  this.Properties = {
    Starfield: {
      Size: 16000
    },
    Sun: {
      Size: 800,
      Distance: 30,
      Speed: {
        Rotation: 0.002,
        Translation: 3
      }
    },
    Mercury: {
      Size: 50,
      Distance: 1200,
      Speed: {
        Rotation: 0.005,
        Translation: 1.607
      }
    },
    Venus: {
      Size: 95,
      Distance: 1450,
      Speed: {
        Rotation: 0.005,
        Translation: 1.174
      }
    },
    Earth: {
      Size: 100,
      Distance: 1850,
      Speed: {
        Rotation: 0.005,
        Translation: 1
      }
    },
    EarthMoon: {
      Size: 30,
      Distance: 200,
      Speed: {
        Rotation: 0.005,
        Translation: 10
      }
    },
    Mars: {
      Size: 60,
      Distance: 2200,
      Speed: {
        Rotation: 0.005,
        Translation: 0.802
      }
    },
    Jupiter: {
      Size: 500,
      Distance: 2850,
      Speed: {
        Rotation: 0.005,
        Translation: 0.434
      }
    },
    Saturn: {
      Size: 400,
      Distance: 4050,
      Speed: {
        Rotation: 0.005,
        Translation: 0.323
      }
    },
    Uranus: {
      Size: 200,
      Distance: 5000,
      Speed: {
        Rotation: 0.005,
        Translation: 0.228
      }
    },
    Neptune: {
      Size: 180,
      Distance: 5550,
      Speed: {
        Rotation: 0.005,
        Translation: 0.182
      }
    },
    Pluto: {
      Size: 90,
      Distance: 5900,
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
