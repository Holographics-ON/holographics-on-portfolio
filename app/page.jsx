'use client';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Image from 'next/image';

const HomePage = () => {
  const onClickScroll = () => {
    const element = document.querySelector('.scroll-down');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 1 - container
    const container = document.getElementById('webgl');
    // 2 - renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    // 3 - scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 4 - camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    camera.lookAt(scene.position);
    scene.add(camera);

    // 5 - lighting
    const pointLight = new THREE.PointLight();
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight();
    // pointLight.position.set(10, 10, 10);
    scene.add(ambientLight);

    // 6 - controls
    // let mouse = new THREE.Vector2();
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 8;
    orbitControls.maxPolarAngle = Math.PI / 1.9;
    orbitControls.minPolarAngle = Math.PI / 4;
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;

    orbitControls.update();

    orbitControls.listenToKeyEvents(window);
    // 7 - sound

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.PositionalAudio(listener);
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('/audio/reflected-light.mp3', (buffer) => {
      sound.setBuffer(buffer);
      // sound.setLoop(true);
      sound.context.resume();
      sound.setVolume(0.5);
      sound.setMaxDistance(15);
      sound.setRefDistance(5);
      sound.setDistanceModel('exponential');
      sound.setRolloffFactor(12);
      sound.onEnded = () => {
        console.log('onEnded');
        sound.isPlaying = false;
      };
      sound.play();
    });
    console.log(sound.context, 'sound context');

    const geometry = new THREE.TetrahedronGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const tetrahedron = new THREE.Mesh(geometry, material);
    tetrahedron.position.set(0, 0, 0);
    tetrahedron.name = 'bio';
    tetrahedron.add(sound);
    scene.add(tetrahedron);

    const loader = new GLTFLoader();
    let mixer;
    loader.load(
      '/models/animated_island-optimised.glb',
      function (gltf) {
        const model = gltf.scene;
        model.position.set(0, -1.5, 0);
        model.name = 'static';

        mixer = new THREE.AnimationMixer(gltf.scene);
        const clips = gltf.animations;
        for (let clip of clips) {
          mixer.clipAction(clip).play();
        }
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    const clock = new THREE.Clock();

    // 8. texture background
    scene.fog = new THREE.FogExp2(0x111111, 0.05);
    /*
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/images/background.png',

      function (texture) {
        texture.minFilter = THREE.LinearFilter;
        scene.background = texture;
      },
      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err) {
        console.error('An error happened.');
      }
    );
    */

    // 9 raycaster

    //raycasting
    // console.log(objects);
    // const objects = [scene.getObjectByName('bio')];

    /*

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    // find intersections
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
      console.log(intersects[i]);
      intersects[i].object.material.color.set(0xff0000);
    }

    window.onpointermove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // console.log(pointer);
    };
    */

    window.onresize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      orbitControls.update();
      if (mixer) mixer.update(clock.getDelta());
      tetrahedron.rotation.y += 0.01;
      tetrahedron.position.y = Math.sin(clock.getElapsedTime()) + 2;
      renderer.render(scene, camera);
    }

    console.log(renderer.info, 'yet to cleaned');

    function cleanup() {
      scene.clear();
      orbitControls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sound.stop();
    }

    animate();

    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);
    return () => {
      cleanup();

      console.log('unmount', renderer.getContext());
      console.log('cleaned', renderer.info);
    };
  }, []);

  return (
    <>
      <div id="webgl"></div>
      <div className="scroll-down" onClick={onClickScroll}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="intro">
        <h2>WELCOME TO MY BIO </h2>
        <p>
          A UCL graduate in Msc business analytics with specialisation in
          computer science. Work experience includes working as a junior data
          scientist for a ski-tech start-up and a market research analyst for an
          e-SIM technology company. A creative coder at heart and have a special
          interest in the upcoming future of WebXR, including the latest
          developments of immersive 3D web.
        </p>
      </div>
      <div className="socials">
        <h3> INSTAGRAM | LINKEDIN </h3>
        <p>
          TO CONNECT: <span>SCAN / CLICK</span> the QR code
        </p>
        <p>
          ALTERNATIVELY: <a href="mailto:weng.chan@hotmail.com">Contact me</a>
          &nbsp;via e-mail &#9786;
        </p>

        <ul>
          <li>
            <a href="https://www.instagram.com/holographics_on/">
              <Image
                src="images/insta.jpg"
                alt="Instagram profile"
                width="128"
                height="128"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/weng-chan">
              <Image
                src="images/linkedin.jpg"
                alt="Linkedin profile"
                width="128"
                height="128"
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomePage;
