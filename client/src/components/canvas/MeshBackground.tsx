import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    // Meditative Palette
    vec3 color1 = vec3(0.027, 0.035, 0.031); // Deeper Teal-Obsidian
    vec3 color2 = vec3(0.08, 0.12, 0.1);   // Soft Sage
    
    // Slow, rhythmic pulse (breathing)
    float breathing = 0.5 + 0.5 * sin(uTime * 0.4);
    float wave = 0.5 + 0.5 * sin(uTime * 0.2 + vUv.x * 3.0 + vUv.y * 2.0);
    
    vec3 finalColor = mix(color1, color2, (breathing * 0.2) + (wave * 0.15));
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const MeshBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  return (
    <mesh scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
