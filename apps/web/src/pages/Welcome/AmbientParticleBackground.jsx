import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AmbientParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ----------------------------------------
    // SCENE & CAMERA
    // ----------------------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    // ----------------------------------------
    // RENDERER
    // ----------------------------------------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x02060d, 1);
    container.appendChild(renderer.domElement);

    // ----------------------------------------
    // FLOATING BOOKS (InstancedMesh)
    // ----------------------------------------
    const isMobile = window.innerWidth < 768;
    const bookCount = isMobile ? 40 : 150;

    // Dimensions of a book
    const geometry = new THREE.BoxGeometry(0.8, 1.2, 0.15);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute vec3 aRandom;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vAlpha;
        varying vec2 vUv;
        
        // 3D Rotation Matrix
        mat3 rotationMatrix(vec3 axis, float angle) {
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;
            return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
                        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
                        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c);
        }

        void main() {
          vUv = uv;
          
          vec3 pos = position;
          
          // Tumble rotation
          float rotAngle = uTime * (0.2 + aRandom.z * 0.3) + aRandom.y * 10.0;
          vec3 rotAxis = normalize(aRandom * 2.0 - 1.0);
          pos = rotationMatrix(rotAxis, rotAngle) * pos;
          
          // Apply Instance Matrix (Base Position)
          vec4 instancePos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          vec3 finalPos = pos + instancePos.xyz;
          
          // Organic Drifting
          finalPos.x += sin(uTime * 0.08 + aRandom.x * 20.0) * 1.5;
          finalPos.y += cos(uTime * 0.06 + aRandom.y * 20.0) * 1.5;
          finalPos.z += sin(uTime * 0.05 + aRandom.z * 20.0) * 1.5;
          
          // Mouse Parallax
          finalPos.x += uMouse.x * (1.0 + aRandom.z) * 2.0;
          finalPos.y += uMouse.y * (1.0 + aRandom.x) * 2.0;

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Fade by depth
          vAlpha = smoothstep(-15.0, 5.0, finalPos.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec2 vUv;
        
        void main() {
          // Holographic edge highlight
          float edgeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          float edgeY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
          float edges = 1.0 - (edgeX * edgeY); // 1 at edges, 0 in center
          
          vec3 baseColor = vec3(0.05, 0.15, 0.4);
          vec3 edgeColor = vec3(0.3, 0.6, 1.0);
          vec3 finalColor = mix(baseColor, edgeColor, edges);
          
          float alpha = mix(0.05, 0.35, edges) * vAlpha;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const instancedBooks = new THREE.InstancedMesh(geometry, material, bookCount);
    const dummy = new THREE.Object3D();
    const randomness = new Float32Array(bookCount * 3);

    for (let i = 0; i < bookCount; i++) {
      // Scatter in a wide volume
      dummy.position.x = (Math.random() - 0.5) * 25;
      dummy.position.y = (Math.random() - 0.5) * 15;
      dummy.position.z = (Math.random() - 0.5) * 15 - 5;
      
      // Random starting rotation
      dummy.rotation.x = Math.random() * Math.PI;
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.rotation.z = Math.random() * Math.PI;
      
      // Random scale variation
      const scale = Math.random() * 0.5 + 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      instancedBooks.setMatrixAt(i, dummy.matrix);
      
      // Store randomness for shaders
      randomness[i * 3] = Math.random();
      randomness[i * 3 + 1] = Math.random();
      randomness[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute("aRandom", new THREE.InstancedBufferAttribute(randomness, 3));
    scene.add(instancedBooks);

    // ----------------------------------------
    // LARGE ATMOSPHERIC GLOW
    // ----------------------------------------
    const glowGeometry = new THREE.PlaneGeometry(2, 2);
    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          // SLOW ATMOSPHERE
          vec2 drift = vec2(sin(uTime * 0.08) * 0.08, cos(uTime * 0.06) * 0.06);
          vec2 center = vec2(0.50, 0.48) + drift;
          float distanceFromCenter = distance(vUv, center);
          float atmosphere = 1.0 - smoothstep(0.05, 0.75, distanceFromCenter);
          atmosphere = pow(atmosphere, 3.0);

          // CURSOR LIGHT
          float mouseDistance = distance(vUv, uMouse);
          float mouseGlow = 1.0 - smoothstep(0.0, 0.45, mouseDistance);
          mouseGlow = pow(mouseGlow, 3.0);

          // BLUE LIGHT
          vec3 blue = vec3(0.04, 0.18, 0.55);
          float intensity = atmosphere * 0.28 + mouseGlow * 0.42;

          gl_FragColor = vec4(blue * intensity, intensity);
        }
      `,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -5; // Behind the books
    scene.add(glow);

    // ----------------------------------------
    // MOUSE TRACKING
    // ----------------------------------------
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);
    const targetShaderMouse = new THREE.Vector2(0.5, 0.5);
    const currentShaderMouse = new THREE.Vector2(0.5, 0.5);

    const handleMouseMove = (event) => {
      if (isMobile) return;
      
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetMouse.x = (x - 0.5) * 2;
      targetMouse.y = -(y - 0.5) * 2;

      targetShaderMouse.x = x;
      targetShaderMouse.y = 1 - y;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // ----------------------------------------
    // RESIZE
    // ----------------------------------------
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // ----------------------------------------
    // ANIMATION LOOP
    // ----------------------------------------
    const clock = new THREE.Clock();
    let frame;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouse.lerp(targetMouse, 0.035);
      currentShaderMouse.lerp(targetShaderMouse, 0.035);

      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.copy(currentMouse);

      glowMaterial.uniforms.uTime.value = time;
      glowMaterial.uniforms.uMouse.value.copy(currentShaderMouse);

      // Subtle camera panning
      camera.position.x += (currentMouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (currentMouse.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Slowly rotate the entire volume of books
      instancedBooks.rotation.y = time * 0.01;
      instancedBooks.rotation.x = Math.sin(time * 0.02) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------
    // CLEANUP
    // ----------------------------------------
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ambient-particle-background"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
}
