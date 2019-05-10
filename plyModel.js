var container, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixer;

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
  camera.position.set(100, 100, 400);

  controls = new THREE.OrbitControls(camera);
  controls.target.set(0, 100, 0);
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 200, 0);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 200, 100);
  scene.add(light);

  // ground
  var mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  // PLY file
  var loader = new THREE.PLYLoader();
  loader.load("models/ply/blade.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 100;
    mesh.position.y = 150;
    mesh.position.z = -10;
    mesh.scale.multiplyScalar(0.25);

    scene.add(mesh);
  });

  // PLY file
  var loader = new THREE.PLYLoader();
  loader.load("models/ply/blade.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 100;
    mesh.position.y = 150;
    mesh.position.z = -10;
    mesh.scale.multiplyScalar(0.25);

    scene.add(mesh);
  });

  var loader = new THREE.PLYLoader();
  loader.load("models/ply/blade.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 200;
    mesh.position.y = 150;
    mesh.position.z = -25;
    mesh.scale.multiplyScalar(0.25);

    scene.add(mesh);
  });

  var loader = new THREE.PLYLoader();
  loader.load("models/ply/blade.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 0;
    mesh.position.y = 150;
    mesh.position.z = -25;
    mesh.scale.multiplyScalar(0.25);

    scene.add(mesh);
  });

  var loader = new THREE.PLYLoader();
  loader.load("models/ply/dragon.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 30;
    mesh.position.y = -50;
    mesh.position.z = -10;
    mesh.scale.multiplyScalar(1000);

    scene.add(mesh);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//
function animate() {
  requestAnimationFrame(animate);

  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
