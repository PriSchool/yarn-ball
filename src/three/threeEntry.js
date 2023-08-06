import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import yarnImage from '../yarn_spool_texture_blue.jpg';
import heightMapImage from '../heightmap_threads.jpg';

export default function ThreeEntryPoint(sceneRef) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, sceneRef);
    controls.target.set(0, 0, 0);
    controls.rotateSpeed = 0.5;
    controls.update();

    const sphereGeometry = new THREE.SphereGeometry(4, 256, 256);

    const textureLoader = new THREE.TextureLoader();
    const yarnTexture = textureLoader.load(yarnImage);
    const heightMapTexture = textureLoader.load(heightMapImage);

    heightMapTexture.wrapS = THREE.ClampToEdgeWrapping;
    heightMapTexture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.MeshPhongMaterial({
        map: yarnTexture,
        displacementMap: heightMapTexture,
        displacementScale: 0.05, // Adjust this value to control the strength of displacement
    });

    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphereMesh);

    // Ambient light to provide soft overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Soft white light
    scene.add(ambientLight);

    // Spot lights to focus on the yarn ball
    const spotLight1 = new THREE.SpotLight(0xeeeece, 100);
    spotLight1.position.set(0, 6.5, 0);
    scene.add(spotLight1);

    const spotLight1CoreGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const spotLight1CoreMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Bright purple
    const spotLight1Core = new THREE.Mesh(spotLight1CoreGeometry, spotLight1CoreMaterial);
    spotLight1Core.position.copy(spotLight1.position);
    scene.add(spotLight1Core);

    const spotLight2 = new THREE.SpotLight(0xff0000, 100);;
    spotLight2.position.set(6.5, 0, 0);
    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(0x00ff00, 100);
    spotLight3.position.set(0, -6.5, 0);
    scene.add(spotLight3);

    const arrowX = new THREE.ArrowHelper(new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 0), 5, 0xff0000);
    const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 3, 0), new THREE.Vector3(0, 0, 0), 5, 0x00ff00);
    const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, 0, 0), 5, 0x0000ff);

    scene.add(arrowX);
    scene.add(arrowY);
    scene.add(arrowZ);

    // Create an animate function to render the scene
    const animate = function () {
        requestAnimationFrame(animate);

        // sphereMesh.rotation.x += 0.005;
        // sphereMesh.rotation.y += 0.005;
        // sphereMesh.rotation.z += 0.005;

        renderer.render(scene, camera);
    };

    // Call the animate function
    animate();
}