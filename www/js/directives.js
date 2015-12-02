angular.module('starter.directives', [])

.directive('cardboardGl', ['Planets', function(Planets) {

  return {
    'restrict': 'E',
    'scope': {
      'stereoEffect':'='
    },
    'link': link
  };

  function link($scope, $element, $attr) {
    var scene, camera, renderer, element, container, effect, controls, clock;
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
      Planets.Loader.load(Planets.baseURL + 'galaxy_starfield.png', function(texture) {
        Planets.Starfield.material = new THREE.MeshPhongMaterial({map: texture, side: THREE.BackSide});
        scene.add(Planets.Starfield);
      });
      Planets.Loader.load(Planets.baseURL + 'sunmap.jpg', function(texture) {
        Planets.Sun.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Sun);
      });
      Planets.Loader.load(Planets.baseURL + 'mercurymap.jpg', function(texture) {
        Planets.Mercury.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Mercury);
      });
      Planets.Loader.load(Planets.baseURL + 'venusmap.jpg', function(texture) {
        Planets.Venus.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Venus);
      });
      Planets.Loader.load(Planets.baseURL + 'earthmap1k.jpg', function(texture) {
        Planets.Earth.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Earth);
      });
      Planets.Loader.load(Planets.baseURL + 'moonmap1k.jpg', function(texture) {
        Planets.EarthMoon.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.EarthMoon);
      });
      Planets.Loader.load(Planets.baseURL + 'marsmap1k.jpg', function(texture) {
        Planets.Mars.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Mars);
      });
      Planets.Loader.load(Planets.baseURL + 'jupitermap.jpg', function(texture) {
        Planets.Jupiter.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Jupiter);
      });
      Planets.Loader.load(Planets.baseURL + 'saturnmap.jpg', function(texture) {
        Planets.Saturn.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Saturn);
      });
      Planets.Loader.load(Planets.baseURL + 'saturn-rings.png', function(texture) {
        Planets.SaturnRing.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        Planets.SaturnRing.rotation.x = -45 * (Math.PI / 180);
        scene.add(Planets.SaturnRing);
      });
      Planets.Loader.load(Planets.baseURL + 'uranusmap.jpg', function(texture) {
        Planets.Uranus.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Uranus);
      });
      Planets.Loader.load(Planets.baseURL + 'saturn-rings.png', function(texture) {
        Planets.UranusRing.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        Planets.UranusRing.rotation.x = -80 * (Math.PI / 180);
        scene.add(Planets.UranusRing);
      });
      Planets.Loader.load(Planets.baseURL + 'neptunemap.jpg', function(texture) {
        Planets.Neptune.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Neptune);
      });
      Planets.Loader.load(Planets.baseURL + 'plutomap1k.jpg', function(texture) {
        Planets.Pluto.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Pluto);
      });
      scene.add(
        Planets.MercuryOrbit,
        Planets.VenusOrbit,
        Planets.EarthOrbit,
        Planets.MoonOrbit,
        Planets.MarsOrbit,
        Planets.JupiterOrbit,
        Planets.SaturnOrbit,
        Planets.UranusOrbit,
        Planets.NeptuneOrbit,
        Planets.PlutoOrbit
      );

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
      Planets.Mercury.rotation.y += 0.005;
      Planets.Venus.rotation.y += 0.005;
      Planets.Earth.rotation.y += 0.005;
      Planets.Mars.rotation.y += 0.005;
      Planets.Jupiter.rotation.y += 0.005;
      Planets.Saturn.rotation.y += 0.005;
      Planets.Uranus.rotation.y += 0.005;
      Planets.Neptune.rotation.y += 0.005;
      Planets.Pluto.rotation.y += 0.005;
      // Planets Translation
      var MathCos = Math.cos(t), MathSin = Math.sin(t);
      Planets.Mercury.position.x = 200 * MathCos;
      Planets.Mercury.position.z = 200 * MathSin;
      Planets.Venus.position.x = 400 * MathCos;
      Planets.Venus.position.z = 400 * MathSin;
      Planets.Earth.position.x = 600 * MathCos;
      Planets.Earth.position.z = 600 * MathSin;
      Planets.MoonOrbit.position.x = Planets.Earth.position.x;
      Planets.MoonOrbit.position.z = Planets.Earth.position.z;
      Planets.EarthMoon.position.x = Planets.MoonOrbit.position.x + (200 * Math.cos(t*10));
      Planets.EarthMoon.position.z = Planets.MoonOrbit.position.z + (200 * Math.sin(t*10));
      Planets.Mars.position.x = 800 * MathCos;
      Planets.Mars.position.z = 800 * MathSin;
      Planets.Jupiter.position.x = 1000 * MathCos;
      Planets.Jupiter.position.z = 1000 * MathSin;
      Planets.Saturn.position.x = 1200 * MathCos;
      Planets.Saturn.position.z = 1200 * MathSin;
      Planets.SaturnRing.position.x = 1200 * MathCos;
      Planets.SaturnRing.position.z = 1200 * MathSin;
      Planets.Uranus.position.x = 1400 * MathCos;
      Planets.Uranus.position.z = 1400 * MathSin;
      Planets.UranusRing.position.x = 1400 * MathCos;
      Planets.UranusRing.position.z = 1400 * MathSin;
      Planets.Neptune.position.x = 1600 * MathCos;
      Planets.Neptune.position.z = 1600 * MathSin;
      Planets.Pluto.position.x = 1800 * MathCos;
      Planets.Pluto.position.z = 1800 * MathSin;
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
  };
}])
