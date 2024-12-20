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
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight( 0xffffff, 0.1) );
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set( - 1.8, 0.6, 2.7 );
var light = new THREE.PointLight( 0xffffff, 1);
camera.add(light);

const loader = new GLTFLoader();

loader.load( './Blender/monkey.glb', async function ( gltf ) {
    const model = gltf.scene;
	scene.add( model );
    renderer.render( scene, camera, model );
}, undefined, function ( error ) {

	console.error( error );

} );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );