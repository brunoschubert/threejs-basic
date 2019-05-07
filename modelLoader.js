//-------------------------------------
var model = "models/vaca.obj";
var material = "models/vaca.mtl";
//-------------------------------------
var container;
var camera, scene, renderer;
var mouseX = 0,
  mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 100;

  // scene
  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);

  // var directionalLight = new THREE.DirectionalLight(0xdddddd);
  // directionalLight.position.set(0, 0, 1);
  // scene.add(directionalLight);

  // model
  var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
  };
  var onError = function() {};
  new THREE.MTLLoader()
    /*.setPath("models/out/2/")*/
    .load(material, function(materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        /*.setPath("models/out/2/")*/
        .load(
          model,
          function(object) {
            object.scale.x = 20;
            object.scale.y = 20;
            object.scale.z = 20;
            object.rotation.y = 3;
            object.position.y = -10.5;
            scene.add(object);
          },
          onProgress,
          onError
        );
    });
  //

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove, false);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
}

//

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
