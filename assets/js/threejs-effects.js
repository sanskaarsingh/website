// assets/js/threejs-effects.js

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if WebGL is supported
    if (!Detector.webgl) {
        console.warn('WebGL not supported - Skipping 3D effects');
        return;
    }

    // 1. Hero Section 3D Background
    const initHeroBackground = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Setup
        const width = heroSection.clientWidth;
        const height = heroSection.clientHeight;
        const heroOverlay = document.querySelector('.hero-overlay');

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 30;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
        heroSection.insertBefore(renderer.domElement, heroOverlay);

        // Particles
        const particleCount = 1500;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color = new THREE.Color(0xe10600); // Ferrari red

        for (let i = 0; i < particleCount; i++) {
            // Positions
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

            // Colors
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Sizes
            sizes[i] = Math.random() * 2;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Material
        const particleMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Points
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate particles
            particleSystem.rotation.x += 0.0005;
            particleSystem.rotation.y += 0.001;

            // Pulsing effect
            const time = Date.now() * 0.001;
            particleSystem.material.size = 0.5 + Math.sin(time * 2) * 0.5;

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
        });
    };

    // 2. 3D Logo Animation
    const init3DLogo = () => {
        const logoContainer = document.querySelector('.logo');
        if (!logoContainer) return;

        // Setup
        const width = 200;
        const height = 100;

        // Scene
        const scene = new THREE.Scene();
        scene.background = null;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 150;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        logoContainer.appendChild(renderer.domElement);

        // Text Geometry
        const fontLoader = new THREE.FontLoader();
        fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new THREE.TextGeometry('SANSKAAR', {
                font: font,
                size: 20,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            });

            // Center the text
            textGeometry.center();

            // Material
            const textMaterial = new THREE.MeshPhongMaterial({
                color: 0xe10600,
                specular: 0xffffff,
                shininess: 100,
                emissive: 0x440000,
                emissiveIntensity: 0.5
            });

            // Mesh
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            scene.add(textMesh);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);

                textMesh.rotation.y += 0.01;
                textMesh.rotation.x += 0.005;

                // Pulsing emissive effect
                textMaterial.emissiveIntensity = 0.3 + Math.sin(Date.now() * 0.001) * 0.2;

                renderer.render(scene, camera);
            };

            animate();
        });
    };

    // 3. Audio Reactive Visualizer
    const initAudioVisualizer = () => {
        const visualizerContainer = document.querySelector('.music-visualizer');
        if (!visualizerContainer || !window.AudioContext) return;

        // Setup
        const width = visualizerContainer.clientWidth;
        const height = 200;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 100;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        visualizerContainer.appendChild(renderer.domElement);

        // Bars
        const barCount = 32;
        const bars = [];
        const geometry = new THREE.BoxGeometry(2, 1, 1);

        for (let i = 0; i < barCount; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: 0xe10600,
                emissive: 0x440000,
                emissiveIntensity: 0.3
            });

            const bar = new THREE.Mesh(geometry, material);
            bar.position.x = (i - barCount / 2) * 3;
            bar.position.y = -10;
            scene.add(bar);
            bars.push(bar);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        // Audio Context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let analyser, dataArray;

        // Mock audio data for demo (replace with real audio in production)
        const updateBars = () => {
            if (!analyser) {
                // Create mock frequency data
                const mockData = new Uint8Array(barCount);
                for (let i = 0; i < barCount; i++) {
                    mockData[i] = Math.floor(Math.random() * 100 + Math.sin(Date.now() * 0.005 + i * 0.2) * 50);
                }

                // Update bars with mock data
                bars.forEach((bar, i) => {
                    const value = mockData[i] / 50;
                    gsap.to(bar.scale, {
                        y: 1 + value * 10,
                        duration: 0.1,
                        ease: 'power1.out'
                    });
                    bar.material.emissiveIntensity = value * 0.5;
                });
            } else {
                // Real audio processing would go here
                analyser.getByteFrequencyData(dataArray);
                bars.forEach((bar, i) => {
                    const value = dataArray[i] / 255;
                    gsap.to(bar.scale, {
                        y: 1 + value * 10,
                        duration: 0.1,
                        ease: 'power1.out'
                    });
                    bar.material.emissiveIntensity = value * 0.5;
                });
            }
        };

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            updateBars();
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = visualizerContainer.clientWidth / height;
            camera.updateProjectionMatrix();
            renderer.setSize(visualizerContainer.clientWidth, height);
        });
    };

    // Initialize all effects
    initHeroBackground();
    init3DLogo();
    initAudioVisualizer();
});

// WebGL detection helper
const Detector = {
    webgl: (function() {
        try {
            const canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    })()
};