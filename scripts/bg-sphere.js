import * as THREE from "./threejs/r117/build/three.module.js";

let camera, scene, renderer, geometry, material, sphere, canvas;

function init() {
    canvas = document.querySelector("#c");
    scene = new THREE.Scene();
    scene.background = new THREE.Color("whitesmoke");

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5
    );
    camera.position.z = 4;

    let radius = 1.35;
    let widthSegments = 16;
    let heightSegments = 12;
    let phiLength = Math.PI * 2;
    let thetaLength = Math.PI;

    geometry = new THREE.SphereBufferGeometry(
        radius,
        widthSegments,
        heightSegments,
        0,
        phiLength,
        0,
        thetaLength
    );

    material = new THREE.MeshNormalMaterial({
        opacity: 0.7,
        flatShading: true,
        wireframe: false,
        depthTest: true,
        depthWrite: true,
        transparent: true,
    });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    function render() {
        renderer.render(scene, camera);
    }

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.y += 0.01;

        render();
    }

    animate();
}

init();
