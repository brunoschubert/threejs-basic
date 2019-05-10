var container, controls;
var camera, scene, renderer, light;
var cube;
var rotationSpeed = 0.01;

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
  light.position.set(0, 300, 100);
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
  loader.load("models/ply/happy_vrip.ply", function(geometry) {
    geometry.computeVertexNormals();

    var material = new THREE.MeshNormalMaterial({});
    material.wireframe = true;
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -50;
    mesh.scale.multiplyScalar(1000);

    scene.add(mesh);
  });

  //SIMPLE CUBE
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshNormalMaterial({});
  //material.wireframe = true;
  cube = new THREE.Mesh(geometry, material);

  cube.position.x = 4;
  cube.position.y = 215;
  cube.position.z = -18;
  cube.scale.multiplyScalar(20);
  scene.add(cube);

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

function rotateCube() {
  cube.rotation.x -= rotationSpeed * 2;
  cube.rotation.y -= rotationSpeed;
  cube.rotation.z -= rotationSpeed * 3;
}

function animate() {
  requestAnimationFrame(animate);

  var delta = clock.getDelta();
  rotateCube();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
