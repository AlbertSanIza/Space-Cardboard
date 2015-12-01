angular.module('starter.directives', [])

.directive('cardboardGl', [function() {

  return {
    'restrict': 'E',
    'scope': {
      'stereoEffect':'='
    },
    'link': link
  };

  function link($scope, $element, $attr) {
    var scene, camera, renderer, element, container, effect, controls, clock;
    var Starfield, Sun, Mercury, Venus, Earth, EarthMoon, Mars, Jupiter, Saturn, SaturnRing, Uranus, Neptune, Pluto;
    var StarfieldSize = 20000;
    var StarFighter;
    init();
    function init() {
      // Main Scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, StarfieldSize + 100);
      camera.position.set(0, 500, 0);
      scene.add(camera);
      renderer = new THREE.WebGLRenderer({antialias: true});
      element = renderer.domElement;
      container = $element[0];
      container.appendChild(element);
      effect = new THREE.StereoEffect(renderer);
      // Controls
      controls = new THREE.OrbitControls(camera, element);
      controls.target.set(camera.position.x + 0.15, camera.position.y, camera.position.z);
      controls.noPan = true;
      controls.noZoom = true;
      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }
        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();
        element.addEventListener('click', fullscreen, false);
        window.removeEventListener('deviceorientation', setOrientationControls, true);
      };
      window.addEventListener('deviceorientation', setOrientationControls, true);
      // Lighting
      light = new THREE.AmbientLight(0xd9d9d9);
      scene.add(light);
      // Loaders
      var manager = new THREE.LoadingManager();
      manager.onProgress = function(item, loaded, total){
        console.log("Loading: " + loaded + "/" + total);
        if(loaded == total) {
          console.log("Load Finished");
        }
      };
      var Loader_Texture = new THREE.TextureLoader(manager);
      var Loader_OBJ = new THREE.OBJLoader(manager);
      // Textures
      Loader_Texture.load('img/planets/galaxy_starfield.png', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture, side: THREE.BackSide});
        var Geometry = new THREE.SphereGeometry(StarfieldSize, 32, 32);
        Starfield = new THREE.Mesh(Geometry, Material);
        scene.add(Starfield);
      });
      Sun = new THREE.Mesh();
      Loader_Texture.load('img/planets/sunmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Sun = new THREE.Mesh(Geometry, Material);
        scene.add(Sun);
      });
      Mercury = new THREE.Mesh();
      MercuryOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:200});
      scene.add(MercuryOrbit);
      Loader_Texture.load('img/planets/mercurymap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Mercury = new THREE.Mesh(Geometry, Material);
        scene.add(Mercury);
      });
      Venus = new THREE.Mesh();
      VenusOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:400});
      scene.add(VenusOrbit);
      Loader_Texture.load('img/planets/venusmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Venus = new THREE.Mesh(Geometry, Material);
        scene.add(Venus);
      });
      Earth = new THREE.Mesh();
      EarthOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:600});
      scene.add(EarthOrbit);
      Loader_Texture.load('img/planets/earthmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Earth = new THREE.Mesh(Geometry, Material);
        scene.add(Earth);
      });
      EarthMoon = new THREE.Mesh();
      MoonOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:200});
      scene.add(MoonOrbit);
      Loader_Texture.load('img/planets/moonmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(50, 32, 32);
        EarthMoon = new THREE.Mesh(Geometry, Material);
        scene.add(EarthMoon);
      });
      Mars = new THREE.Mesh();
      MarsOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:800});
      scene.add(MarsOrbit);
      Loader_Texture.load('img/planets/marsmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Mars = new THREE.Mesh(Geometry, Material);
        scene.add(Mars);
      });
      Jupiter = new THREE.Mesh();
      JupiterOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1000});
      scene.add(JupiterOrbit);
      Loader_Texture.load('img/planets/jupitermap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Jupiter = new THREE.Mesh(Geometry, Material);
        scene.add(Jupiter);
      });
      Saturn = new THREE.Mesh();
      SaturnOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1200});
      scene.add(SaturnOrbit);
      Loader_Texture.load('img/planets/saturnmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Saturn = new THREE.Mesh(Geometry, Material);
        scene.add(Saturn);
      });
      SaturnRing = new THREE.Mesh();
      Loader_Texture.load('img/planets/saturn-rings.png', function(texture) {
        var Material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        var Geometry = new THREE.XRingGeometry(110, 150, 50, 6, 0, Math.PI * 2);
        SaturnRing = new THREE.Mesh(Geometry, Material);
        SaturnRing.position.set(0, 0, 1200);
        SaturnRing.rotation.x = -45 * (Math.PI / 180);
        scene.add(SaturnRing);
      });
      Uranus = new THREE.Mesh();
      UranusOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1400});
      scene.add(UranusOrbit);
      Loader_Texture.load('img/planets/uranusmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Uranus = new THREE.Mesh(Geometry, Material);
        scene.add(Uranus);
      });
      UranusRing = new THREE.Mesh();
      Loader_Texture.load('img/planets/saturn-rings.png', function(texture) {
        var Material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        var Geometry = new THREE.XRingGeometry(110, 130, 50, 6, 0, Math.PI * 2);
        UranusRing = new THREE.Mesh(Geometry, Material);
        UranusRing.position.set(0, 0, 1400);
        UranusRing.rotation.x = -80 * (Math.PI / 180);
        scene.add(UranusRing);
      });
      Neptune = new THREE.Mesh();
      NeptuneOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1600});
      scene.add(NeptuneOrbit);
      Loader_Texture.load('img/planets/neptunemap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Neptune = new THREE.Mesh(Geometry, Material);
        scene.add(Neptune);
      });
      Pluto = new THREE.Mesh();
      PlutoOrbit = PlanetOrbit({X:0, Y:0, Z:0}, {X:0, Y:0, Z:1400});
      scene.add(PlutoOrbit);
      Loader_Texture.load('img/planets/plutomap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Pluto = new THREE.Mesh(Geometry, Material);
        scene.add(Pluto);
      });
      Loader_OBJ.load( 'obj/StarFighter/StarFighter.obj', function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.map = THREE.ImageUtils.loadTexture('obj/StarFighter/StarFighter.png');
          }
        });
        object.scale.x = 0.3;
        object.scale.y = 0.3;
        object.scale.z = 0.3;
        object.rotation.y = -90 * (Math.PI / 180);
        object.rotation.z = -0 * (Math.PI / 180);
        object.position.set(0, -2, -17);
        StarFighter = object.clone();
        camera.add(StarFighter);
      });
      clock = new THREE.Clock();
      animate();
    };
    function animate() {
      var elapsedSeconds = clock.getElapsedTime();
      requestAnimationFrame(animate);
      update(clock.getDelta());
      render(clock.getDelta());
    };
    function update(dt) {
      resize();
      camera.updateProjectionMatrix();
      controls.update(dt);
    };
    var t = 0;
    function render(dt) {
      /* Magic Zone */
      t += 0.001;
      // Planets Rotation
      Mercury.rotation.y += 0.005;
      Venus.rotation.y += 0.005;
      Earth.rotation.y += 0.005;
      Mars.rotation.y += 0.005;
      Jupiter.rotation.y += 0.005;
      Saturn.rotation.y += 0.005;
      Uranus.rotation.y += 0.005;
      Neptune.rotation.y += 0.005;
      Pluto.rotation.y += 0.005;
      // Planets Translation
      var MathCos = Math.cos(t), MathSin = Math.sin(t);
      Mercury.position.x = 200 * MathCos;
      Mercury.position.z = 200 * MathSin;
      Venus.position.x = 400 * MathCos;
      Venus.position.z = 400 * MathSin;
      Earth.position.x = 600 * MathCos;
      Earth.position.z = 600 * MathSin;
      MoonOrbit.position.x = Earth.position.x;
      MoonOrbit.position.z = Earth.position.z;
      EarthMoon.position.x = MoonOrbit.position.x + (200 * Math.cos(t*10));
      EarthMoon.position.z = MoonOrbit.position.z + (200 * Math.sin(t*10));
      Mars.position.x = 800 * MathCos;
      Mars.position.z = 800 * MathSin;
      Jupiter.position.x = 1000 * MathCos;
      Jupiter.position.z = 1000 * MathSin;
      Saturn.position.x = 1200 * MathCos;
      Saturn.position.z = 1200 * MathSin;
      SaturnRing.position.x = 1200 * MathCos;
      SaturnRing.position.z = 1200 * MathSin;
      Uranus.position.x = 1400 * MathCos;
      Uranus.position.z = 1400 * MathSin;
      UranusRing.position.x = 1400 * MathCos;
      UranusRing.position.z = 1400 * MathSin;
      Neptune.position.x = 1600 * MathCos;
      Neptune.position.z = 1600 * MathSin;
      Pluto.position.x = 1800 * MathCos;
      Pluto.position.z = 1800 * MathSin;
      /* Magic Zone */
      if($scope.stereoEffect == true) {
        effect.render(scene, camera);
      } else {
        renderer.render(scene, camera);
      }
    };
    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if($scope.stereoEffect == true) {
        effect.setSize(width, height);
      } else {
        renderer.setSize(width, height);
      }
    };
    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    };
    function PlanetOrbit(Position0, Position1) {
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
  };
}])
