'use strict';

(function(){

    angular.module('MainDirective').directive("particleCloud", [function () {
        return {
            restrict: 'E',
            link: function (scope, element, attributes) {
                var scene, camera, renderer;

    /*  I guess we need this stuff too  */
  var container, HEIGHT,
    WIDTH, fieldOfView, aspectRatio,
    nearPlane, farPlane, stats,
    geometry, particleCount,
    i, h, color, size,
    materials = [],
    mouseX = 0,
    mouseY = 0,
    windowHalfX, windowHalfY, cameraZ, fogHex, fogDensity, parameters, parameterCount, particles, container;

  init();
  animate();

  function init() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;

    fieldOfView = 75;
    aspectRatio = windowHalfX / windowHalfY;
    nearPlane = 1;
    farPlane = 5000;


  /*  fieldOfView — Camera frustum vertical field of view.
  aspectRatio — Camera frustum aspect ratio.
  nearPlane — Camera frustum near plane.
  farPlane — Camera frustum far plane.
  - http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
  In geometry, a frustum (plural: frusta or frustums)
  is the portion of a solid (normally a cone or pyramid)
  that lies between two parallel planes cutting it. - wikipedia.    */

  cameraZ = farPlane / 3;   /*  So, 1000? Yes! move on! */
  fogHex = 0x000000;      /* As black as your heart.  */
  fogDensity = 0.00000001;    /* So not terribly dense? */

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.position.z = cameraZ;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(fogHex, fogDensity);
  // creates and appends container div to dom //
  container = document.createElement('div');
  container.setAttribute("id", "background");
  document.body.appendChild(container);


  // creates a base geometry that holds all data necessary to describe a 3d model
  geometry = new THREE.Geometry();  /*  NO ONE SAID ANYTHING ABOUT MATH! UGH! */

  particleCount = 1000;  /* Leagues under the sea */

  /*  Hope you took your motion sickness pills;
  We're about to get loopy. */

  for (i = 0; i < particleCount; i++) {
    // creates vertices, each with x,y,z from -1000 to 1000
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 4000 - 2000;
    vertex.y = Math.random() * 4000 - 2000;
    vertex.z = Math.random() * 4000 - 2000;

    geometry.vertices.push(vertex);
  }

  /*  We can't stop here, this is bat country!  */

  parameters = [[16737792, 25], [414463, 20], [16737792, 15], [414463, 10], [16737792, 5]];
  // parameters give them varied shapes and colors, that sweet, sweet textured feels
  parameterCount = parameters.length;

  /*  I told you to take those motion sickness pills.
  Clean that vommit up, we're going again!  */

  for (i = 0; i < parameterCount; i++) {

    size  = parameters[i][1];

    materials[i] = new THREE.PointCloudMaterial({size:size});

    particles = new THREE.PointCloud(geometry, materials[i]);
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add(particles);
  }

  /*  If my calculations are correct, when this baby hits 88 miles per hour...
  you're gonna see some serious shit. */

  renderer = new THREE.WebGLRenderer();         /*  Rendererererers particles.  */
  renderer.setPixelRatio(window.devicePixelRatio);  /*  Probably 1; unless you're fancy.  */
  renderer.setSize(WIDTH, HEIGHT);          /*  Full screen baby Wooooo!  */

  container.appendChild(renderer.domElement);   /* Let's add all this crazy junk to the page. */

    /* Event Listeners */

    window.addEventListener('resize', onWindowResize, false);
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    // document.addEventListener('touchstart', onDocumentTouchStart, false);
    // document.addEventListener('touchmove', onDocumentTouchMove, false);

  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    var time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);
    // builds a new animation frame by rotating the current frame
    for (i = 0; i < scene.children.length; i ++) {

      var object = scene.children[i];

      if (object instanceof THREE.PointCloud) {
        // manipulates the y rotation time //
        object.rotation.y = time * (i < 4 ? i + 3 : - (i + 3));
      }
    }

    for (i = 0; i < materials.length; i ++) {

      color = parameters[i][0];
      // sets the hue, saturation and lightness of colors, depending on the time, uses modulus as a wrap-around //
      materials[i].color.setHex(color);
    }

    renderer.render(scene, camera);
  }

  // resizes the canvas according to the new length and width of the window
  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
            }
        }
    }]);
})();
