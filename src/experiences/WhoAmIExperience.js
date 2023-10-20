import * as THREE from 'three';

export default class WhoAmIExperience {
  constructor(canvas, container) {
    this.canvas = canvas;
    this.container = container;

    this.sizes = this.getSceneSizes();
    this.scene = new THREE.Scene();

    window.addEventListener('resize', () => this.resize());

    this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.set(0, 0, 8);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.useLegacyLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    this.geometry = new THREE.IcosahedronGeometry(1.5, 0);
    this.material = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.9,
      roughness: 0.1,
      metalness: 0.5,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    this.edges = new THREE.EdgesGeometry(this.geometry); 
    this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    this.scene.add(this.line);

    this.ambientLight = new THREE.AmbientLight('#1b0024', 0.3);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight('#f3ceff', 0.2);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.set(256, 256);
    this.directionalLight.shadow.camera.far = 15;
    this.directionalLight.shadow.normalBias = 0.05;
    this.directionalLight.position.set(1, 2, 5);
    this.scene.add(this.directionalLight);

    // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, '#ff0000');
    // scene.add(directionalLightHelper);

    this.clock = new THREE.Clock();

    this.animate();
  }

  getSceneSizes() {
    const elementSizes = this.container.getBoundingClientRect();

    return {
      width: elementSizes.width,
      height: elementSizes.height,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
  }

  resize() {
    // Update sizes
    this.sizes = this.getSceneSizes();

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();

    this.mesh.rotation.x = Math.sin(elapsedTime * 0.25);
    this.mesh.rotation.y = elapsedTime * 0.5;

    this.line.rotation.x = Math.sin(elapsedTime * 0.25);
    this.line.rotation.y = elapsedTime * 0.5;

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        Object.keys(child.material).forEach((key) => {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
      }
    })

    this.renderer.dispose();
    this.renderer = null;

    this.camera = null;
    window.removeEventListener('resize', () => this.resize());
    this.scene = null;
  }
};
