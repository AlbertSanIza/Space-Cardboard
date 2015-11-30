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
    var BaseSize = 100;
    var StarfieldSize = 50000;
    var SunSize = 2000;
    var MercurySize = BaseSize * 0.382;
    var VenusSize = BaseSize * 0.949;
    var EarthSize = BaseSize;
    var MarsSize = BaseSize * 0.532;
    var JupiterSize = BaseSize * 11.209;
    var SaturnSize = BaseSize * 9.44;
    var UranusSize = BaseSize * 4.007;
    var NeptuneSize = BaseSize * 3.883;
    var PlutoSize = BaseSize * 0.180;
    var EarthBaseDistance = 1000;
    init();
    function init() {
      // Main Scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, StarfieldSize + 100);
      camera.position.set(0, 3000, 5000);
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
      Loader_Texture.load('lib/threex/threex.planets/images/galaxy_starfield.png', function(texture) {
        var Material = new THREE.MeshPhongMaterial({map: texture, side: THREE.BackSide});
        var Geometry = new THREE.SphereGeometry(100000, 32, 32);
        var Starfield = new THREE.Mesh(Geometry, Material);
        scene.add(Starfield);
      });
      Sun = THREEx.Planets.createSun();
      Sun.geometry = new THREE.SphereGeometry(SunSize, 32, 32);
      scene.add(Sun);
      Mercury = THREEx.Planets.createMercury();
      Mercury.geometry = new THREE.SphereGeometry(MercurySize, 32, 32);
      Mercury.position.set(0, 0, SunSize + (EarthBaseDistance * 0.39));
      scene.add(Mercury);
      Venus = THREEx.Planets.createVenus();
      Venus.geometry = new THREE.SphereGeometry(VenusSize, 32, 32);
      Venus.position.set(0, 0, SunSize + (EarthBaseDistance * 0.72));
      scene.add(Venus);
      Earth = THREEx.Planets.createEarth();
      Earth.geometry = new THREE.SphereGeometry(EarthSize, 32, 32);
      Earth.position.set(0, 0, SunSize + EarthBaseDistance);
      scene.add(Earth);
      EarthMoon = THREEx.Planets.createMoon();
      EarthMoon.geometry = new THREE.SphereGeometry(10, 32, 32);
      scene.add(EarthMoon);
      Mars = THREEx.Planets.createMars();
      Mars.geometry = new THREE.SphereGeometry(MarsSize, 32, 32);
      Mars.position.set(0, 0, SunSize + (EarthBaseDistance * 1.52));
      scene.add(Mars);
      Jupiter = THREEx.Planets.createJupiter();
      Jupiter.geometry = new THREE.SphereGeometry(JupiterSize, 32, 32);
      Jupiter.position.set(0, 0, SunSize + (EarthBaseDistance * 4.20));
      scene.add(Jupiter);
      Saturn = THREEx.Planets.createSaturn();
      Saturn.geometry = new THREE.SphereGeometry(SaturnSize, 32, 32);
      Saturn.position.set(0, 0, SunSize + (EarthBaseDistance * 7.54));
      scene.add(Saturn);
      SaturnRing = new THREE.Mesh(new THREE.XRingGeometry(SaturnSize, (SaturnSize) * 1.5, 50, 6, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('lib/threex/threex.planets/images/saturn-rings.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      }));
      SaturnRing.position.set(0, 0, SunSize + (EarthBaseDistance * 7.54));
      scene.add(SaturnRing);
      Uranus = THREEx.Planets.createUranus();
      Uranus.geometry = new THREE.SphereGeometry(UranusSize, 32, 32);
      Uranus.position.set(0, 0, SunSize + (EarthBaseDistance * 16.18));
      scene.add(Uranus);
      /*
      UranusRing = THREEx.Planets.createUranusRing();
      UranusRing.geometry = new THREE.SphereGeometry(12, 32, 32);
      scene.add(UranusRing);
      */
      Neptune = THREEx.Planets.createNeptune();
      Neptune.geometry = new THREE.SphereGeometry(NeptuneSize, 32, 32);
      Neptune.position.set(0, 0, SunSize + (EarthBaseDistance * 25.06));
      scene.add(Neptune);
      Pluto = THREEx.Planets.createPluto();
      Pluto.geometry = new THREE.SphereGeometry(PlutoSize, 32, 32);
      Pluto.position.set(0, 0, SunSize + (EarthBaseDistance * 30.44));
      scene.add(Pluto);
      /*
      SaturnRing = new THREE.Mesh(new THREE.XRingGeometry(12, 20, 50, 6, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('lib/threex/threex.planets/images/saturn-rings.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      }));
      scene.add(SaturnRing);
      */
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
