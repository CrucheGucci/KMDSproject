// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// // const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // const renderer = new THREE.WebGLRenderer();
// // renderer.setSize(window.innerWidth, window.innerHeight);
// // document.body.appendChild(renderer.domElement);

// // const geometry = new THREE.BoxGeometry(1, 1, 5);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ffee });
// // const cube = new THREE.Mesh(geometry, material);
// // scene.add(cube);

// // camera.position.z = 50;

// // function animate() {
// //     cube.rotation.x += 0.03;
// //     cube.rotation.y += 0.03;
// //     renderer.render(scene, camera);
// // }
// // renderer.setAnimationLoop(animate);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// // const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );    
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, - 10, 0 ) );
// points.push( new THREE.Vector3( -10, -10, 0 ) );
// points.push( new THREE.Vector3( 0, 0, 5 ) );
// points.push( new THREE.Vector3( -10, 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// // const line = new THREE.Line( geometry, material );
// // scene.add( line );
// // renderer.render( scene, camera );

// const loader = new GLTFLoader();

// loader.load( 'Blender/monkey.glb', async function ( gltf ) {
//     const model = gltf.scene
//     await renderer.compileAsync( model, camera, scene );
// 	scene.add( model );
//     renderer.render( scene, camera );
// }, undefined, function ( error ) {

// 	console.error( error );

// } );

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer( { antialias: true } );
const canvas = renderer.domElement;
class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
    }
    pick(normalizedPosition, scene, camera, time) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
      }
   
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(scene.children);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        // save its color
        this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // set its emissive color to flashing red/yellow
        this.pickedObject.material.emissive.setHex(0xE7504E);
        
      }
    }
  }
const pickHelper = new PickHelper();

const controls = new OrbitControls( camera, renderer.domElement );
// const pointer = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();
const lights = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5, 0.1);
const lights2 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5, 0.1);
const lights3 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5, 0.1);
const lights4 = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5, 0.1);
const loader = new GLTFLoader();
const helper = new THREE.DirectionalLightHelper(lights, 5);
camera.position.set(4, 5, 11 );
camera.lookAt(0, 0, 0);
controls.update();



lights.position.set(0, 25, 0);
lights2.position.set(0, -25, 0);
lights3.position.set(32, 15, 5);
lights4.position.set(32, -15, 5);
scene.add(lights);
scene.add(lights2);
scene.add(lights3);
scene.add(lights4);
scene.add(helper);



  const pickPosition = {x: 0, y: 0};
clearPickPosition();
 

 
function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();

  const x = (event.clientX - rect.left) * canvas.width  / rect.width
  const y = (event.clientY - rect.top ) * canvas.height / rect.height
//   console.log("x:", x)
//   console.log("y:", y)
  return {
    x,
    y,
  };
}
 
function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y

//   console.log(pickPosition)
//   console.log("canvas.height)", canvas.height)
  //   console.log("y:", y)
}
 
function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}
 
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

loader.load( './Blender/PAN_TIMUR_GENIUS.glb', async function ( gltf ) {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
	scene.add( model );

    renderer.render( scene, camera, model );
}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( './Blender/PAN_TIMUR_GENIUS.glb', async function ( gltf ) {
    const model = gltf.scene;
    model.position.set(10, 0, 0);
	scene.add( model );
    
    renderer.render( scene, camera, model );
}, undefined, function ( error ) {
	console.error( error );
} );
function animate(time){
    controls.update();
    renderer.render( scene, camera );
    time *= 0.001;
    pickHelper.pick(pickPosition, scene, camera, time);
}
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );
renderer.setAnimationLoop( animate );
// stats = new Stats();
// 				document.body.appendChild( stats.dom );
				// document.addEventListener( 'mousemove', onPointerMove );
				// window.addEventListener( 'resize', onWindowResize );