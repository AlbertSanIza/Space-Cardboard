angular.module('starter.directives', [])

.directive('cardboardGl', ['Planets', function(Planets) {

  return {
    'restrict': 'E',
    'templateUrl': 'templates/cardboard.html',
    'scope': {
      'stereoEffect':'='
    },
    'link': link
  };

  function link($scope, $element, $attr) {
    var scene, camera, renderer, element, container, effect, controls, clock;
    var StarFighter, FighterPosition = {x: 0, y: 1500, z: 0};
    var TextMesh, textcontainer;
    init();
    function init() {
      // Main Scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, Planets.Properties.Starfield.Size + 100);
      camera.position.set(FighterPosition.x, FighterPosition.y, FighterPosition.z);
      scene.add(camera);
      renderer = new THREE.WebGLRenderer({antialias: true});
      element = renderer.domElement;
      container = $element[0];
      container.appendChild(element);
      //console.log(container.getElementById('eltexto'));
      textcontainer = container.querySelector('#eltexto');

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
      var Loader_OBJ = new THREE.OBJLoader(manager);
      // Textures
      Planets.Loader.load(Planets.baseURL + 'galaxy_starfield.png', function(texture) {
        Planets.Starfield.Sphere.material = new THREE.MeshPhongMaterial({map: texture, side: THREE.BackSide});
        scene.add(Planets.Starfield.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'sunmap.jpg', function(texture) {
        Planets.Sun.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Sun.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'mercurymap.jpg', function(texture) {
        Planets.Mercury.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Mercury.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'venusmap.jpg', function(texture) {
        Planets.Venus.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Venus.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'earthmap1k.jpg', function(texture) {
        Planets.Earth.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Earth.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'moonmap1k.jpg', function(texture) {
        Planets.EarthMoon.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.EarthMoon.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'marsmap1k.jpg', function(texture) {
        Planets.Mars.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Mars.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'jupitermap.jpg', function(texture) {
        Planets.Jupiter.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Jupiter.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'saturnmap.jpg', function(texture) {
        Planets.Saturn.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Saturn.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'saturn-rings.png', function(texture) {
        Planets.Saturn.Ring.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        Planets.Saturn.Ring.rotation.x = -45 * (Math.PI / 180);
        scene.add(Planets.Saturn.Ring);
      });
      Planets.Loader.load(Planets.baseURL + 'uranusmap.jpg', function(texture) {
        Planets.Uranus.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Uranus.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'saturn-rings.png', function(texture) {
        Planets.Uranus.Ring.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        Planets.Uranus.Ring.rotation.x = -80 * (Math.PI / 180);
        scene.add(Planets.Uranus.Ring);
      });
      Planets.Loader.load(Planets.baseURL + 'neptunemap.jpg', function(texture) {
        Planets.Neptune.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Neptune.Sphere);
      });
      Planets.Loader.load(Planets.baseURL + 'plutomap1k.jpg', function(texture) {
        Planets.Pluto.Sphere.material = new THREE.MeshPhongMaterial({map: texture});
        scene.add(Planets.Pluto.Sphere);
      });
      scene.add(
        Planets.Mercury.Orbit,
        Planets.Venus.Orbit,
        Planets.Earth.Orbit,
        Planets.EarthMoon.Orbit,
        Planets.Mars.Orbit,
        Planets.Jupiter.Orbit,
        Planets.Saturn.Orbit,
        Planets.Uranus.Orbit,
        Planets.Neptune.Orbit,
        Planets.Pluto.Orbit
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

      TextGeometry = new THREE.TextGeometry("Hello", {
        size: 2,
        height: 1
      });
      TextMesh = new THREE.Mesh( TextGeometry, new THREE.MeshPhongMaterial() );
      TextMesh.position.set(-5, 12, -16);
      TextMesh.rotation.x = 20 * (Math.PI / 180);
      //TextMesh.rotation.y = 25 * (Math.PI / 180);
      camera.add(TextMesh);

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
    var t = 100 * Math.random();
    function render(dt) {
      /* Magic Zone */
      t += 0.001;
      //TextMesh.rotation.y += 0.1;
      // Planets Rotation
      Planets.Sun.Sphere.rotation.y += Planets.Properties.Sun.Speed.Rotation;
      Planets.Mercury.Sphere.rotation.y += Planets.Properties.Mercury.Speed.Rotation;
      Planets.Venus.Sphere.rotation.y -= Planets.Properties.Venus.Speed.Rotation;
      Planets.Earth.Sphere.rotation.y += Planets.Properties.Earth.Speed.Rotation;
      Planets.EarthMoon.Sphere.rotation.y += Planets.Properties.EarthMoon.Speed.Rotation;
      Planets.Mars.Sphere.rotation.y += Planets.Properties.Mars.Speed.Rotation;
      Planets.Jupiter.Sphere.rotation.y += Planets.Properties.Jupiter.Speed.Rotation;
      Planets.Saturn.Sphere.rotation.y += Planets.Properties.Saturn.Speed.Rotation;
      Planets.Uranus.Sphere.rotation.y -= Planets.Properties.Uranus.Speed.Rotation;
      Planets.Neptune.Sphere.rotation.y += Planets.Properties.Neptune.Speed.Rotation;
      Planets.Pluto.Sphere.rotation.y -= Planets.Properties.Pluto.Speed.Rotation;
      // Planets Translation
      Planets.Sun.Sphere.position.x = Planets.Properties.Sun.Distance * Math.cos(t * Planets.Properties.Sun.Speed.Translation);
      Planets.Sun.Sphere.position.z = Planets.Properties.Sun.Distance * Math.sin(t * Planets.Properties.Sun.Speed.Translation);
      Planets.Mercury.Sphere.position.x = Planets.Properties.Mercury.Distance * Math.cos(t * Planets.Properties.Mercury.Speed.Translation);
      Planets.Mercury.Sphere.position.z = Planets.Properties.Mercury.Distance * Math.sin(t * Planets.Properties.Mercury.Speed.Translation);
      Planets.Venus.Sphere.position.x = Planets.Properties.Venus.Distance * Math.cos(t * Planets.Properties.Venus.Speed.Translation);
      Planets.Venus.Sphere.position.z = Planets.Properties.Venus.Distance * Math.sin(t * Planets.Properties.Venus.Speed.Translation);
      Planets.Earth.Sphere.position.x = Planets.Properties.Earth.Distance * Math.cos(t * Planets.Properties.Earth.Speed.Translation);
      Planets.Earth.Sphere.position.z = Planets.Properties.Earth.Distance * Math.sin(t * Planets.Properties.Earth.Speed.Translation);
      Planets.EarthMoon.Orbit.position.x = Planets.Earth.Sphere.position.x;
      Planets.EarthMoon.Orbit.position.z = Planets.Earth.Sphere.position.z;
      Planets.EarthMoon.Sphere.position.x = Planets.EarthMoon.Orbit.position.x + (200 * Math.cos(t * Planets.Properties.EarthMoon.Speed.Translation));
      Planets.EarthMoon.Sphere.position.z = Planets.EarthMoon.Orbit.position.z + (200 * Math.sin(t * Planets.Properties.EarthMoon.Speed.Translation));
      Planets.Mars.Sphere.position.x = Planets.Properties.Mars.Distance * Math.cos(t * Planets.Properties.Mars.Speed.Translation);
      Planets.Mars.Sphere.position.z = Planets.Properties.Mars.Distance * Math.sin(t * Planets.Properties.Mars.Speed.Translation);
      Planets.Jupiter.Sphere.position.x = Planets.Properties.Jupiter.Distance * Math.cos(t * Planets.Properties.Jupiter.Speed.Translation);
      Planets.Jupiter.Sphere.position.z = Planets.Properties.Jupiter.Distance * Math.sin(t * Planets.Properties.Jupiter.Speed.Translation);
      Planets.Saturn.Sphere.position.x = Planets.Properties.Saturn.Distance * Math.cos(t * Planets.Properties.Saturn.Speed.Translation);
      Planets.Saturn.Sphere.position.z = Planets.Properties.Saturn.Distance * Math.sin(t * Planets.Properties.Saturn.Speed.Translation);
      Planets.Saturn.Ring.position.x = Planets.Saturn.Sphere.position.x;
      Planets.Saturn.Ring.position.z = Planets.Saturn.Sphere.position.z;
      Planets.Uranus.Sphere.position.x = Planets.Properties.Uranus.Distance * Math.cos(t * Planets.Properties.Uranus.Speed.Translation);
      Planets.Uranus.Sphere.position.z = Planets.Properties.Uranus.Distance * Math.sin(t * Planets.Properties.Uranus.Speed.Translation);
      Planets.Uranus.Ring.position.x = Planets.Uranus.Sphere.position.x;
      Planets.Uranus.Ring.position.z = Planets.Uranus.Sphere.position.z;
      Planets.Neptune.Sphere.position.x = Planets.Properties.Neptune.Distance * Math.cos(t * Planets.Properties.Neptune.Speed.Translation);
      Planets.Neptune.Sphere.position.z = Planets.Properties.Neptune.Distance * Math.sin(t * Planets.Properties.Neptune.Speed.Translation);
      Planets.Pluto.Sphere.position.x = Planets.Properties.Pluto.Distance * Math.cos(t * Planets.Properties.Pluto.Speed.Translation);
      Planets.Pluto.Sphere.position.z = Planets.Properties.Pluto.Distance * Math.sin(t * Planets.Properties.Pluto.Speed.Translation);
      // Camera Movement
      if($scope.stereoEffect == true) {
        var FighterSpeed = 1.5;
        if (Planets.Distance(StarFighter, Planets.Jupiter.Sphere) <= (Planets.Properties.Saturn.Size + 100)) {
          FighterSpeed = FighterSpeed * 5;
        }
        var cameraDirection = camera.getWorldDirection();
        FighterPosition.x += cameraDirection.x * FighterSpeed;
        FighterPosition.y += cameraDirection.y * FighterSpeed;
        FighterPosition.z += cameraDirection.z * FighterSpeed;
        camera.position.set(FighterPosition.x, FighterPosition.y, FighterPosition.z);
      }
      // Text
      textcontainer.innerHTML  = "X: " + FighterPosition.x + "<br>Y: " + FighterPosition.y + "<br>Z: " + FighterPosition.z;
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
