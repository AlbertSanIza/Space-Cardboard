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
      camera.position.set(0, 500, 1000);
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
      Loader_Texture.load('img/planets/mercurymap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Mercury = new THREE.Mesh(Geometry, Material);
        Mercury.position.set(0, 0, 200);
        scene.add(Mercury);
      });
      Venus = new THREE.Mesh();
      Loader_Texture.load('img/planets/venusmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Venus = new THREE.Mesh(Geometry, Material);
        Venus.position.set(0, 0, 400);
        scene.add(Venus);
      });
      Earth = new THREE.Mesh();
      Loader_Texture.load('img/planets/earthmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Earth = new THREE.Mesh(Geometry, Material);
        Earth.position.set(0, 0, 600);
        scene.add(Earth);
      });
      EarthMoon = new THREE.Mesh();
      Loader_Texture.load('img/planets/moonmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        EarthMoon = new THREE.Mesh(Geometry, Material);
        EarthMoon.position.set(200, 0, 600);
        scene.add(EarthMoon);
      });
      Mars = new THREE.Mesh();
      Loader_Texture.load('img/planets/marsmap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Mars = new THREE.Mesh(Geometry, Material);
        Mars.position.set(0, 0, 800);
        scene.add(Mars);
      });
      Jupiter = new THREE.Mesh();
      Loader_Texture.load('img/planets/jupitermap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Jupiter = new THREE.Mesh(Geometry, Material);
        Jupiter.position.set(0, 0, 1000);
        scene.add(Jupiter);
      });
      Saturn = new THREE.Mesh();
      Loader_Texture.load('img/planets/saturnmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Saturn = new THREE.Mesh(Geometry, Material);
        Saturn.position.set(0, 0, 1200);
        scene.add(Saturn);
      });
      SaturnRing = new THREE.Mesh();
      Loader_Texture.load('img/planets/saturn-rings.png', function(texture) {
        var Material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        var Geometry = new THREE.XRingGeometry(100, 150, 50, 6, 0, Math.PI * 2);
        SaturnRing = new THREE.Mesh(Geometry, Material);
        SaturnRing.position.set(0, 0, 1200);
        SaturnRing.rotation.x = -45 * (Math.PI / 180);
        scene.add(SaturnRing);
      });
      Uranus = new THREE.Mesh();
      Loader_Texture.load('img/planets/uranusmap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Uranus = new THREE.Mesh(Geometry, Material);
        Uranus.position.set(0, 0, 1400);
        scene.add(Uranus);
      });
      UranusRing = new THREE.Mesh();
      Loader_Texture.load('img/planets/saturn-rings.png', function(texture) {
        var Material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.6});
        var Geometry = new THREE.XRingGeometry(100, 130, 50, 6, 0, Math.PI * 2);
        UranusRing = new THREE.Mesh(Geometry, Material);
        UranusRing.position.set(0, 0, 1400);
        UranusRing.rotation.x = -80 * (Math.PI / 180);
        scene.add(UranusRing);
      });
      Neptune = new THREE.Mesh();
      Loader_Texture.load('img/planets/neptunemap.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Neptune = new THREE.Mesh(Geometry, Material);
        Neptune.position.set(0, 0, 1600);
        scene.add(Neptune);
      });
      Pluto = new THREE.Mesh();
      Loader_Texture.load('img/planets/plutomap1k.jpg', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture});
        var Geometry = new THREE.SphereGeometry(100, 32, 32);
        Pluto = new THREE.Mesh(Geometry, Material);
        Pluto.position.set(0, 0, 1800);
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
        fighter = object.clone();
        camera.add(fighter);
      });
      clock = new THREE.Clock();
      animate();
    };
    function animate() {
      var elapsedSeconds = clock.getElapsedTime();
      requestAnimationFrame(animate);
      /* Magic Zone */
      Earth.rotation.y += 0.005;
      /* Magic Zone */
      update(clock.getDelta());
      render(clock.getDelta());
    };
    function update(dt) {
      resize();
      camera.updateProjectionMatrix();
      controls.update(dt);
    };
    function render() {
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
