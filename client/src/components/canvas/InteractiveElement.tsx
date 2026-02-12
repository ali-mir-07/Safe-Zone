import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export const InteractiveElement = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse, viewport } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            // Smooth parallax effect
            const targetX = (mouse.x * viewport.width) / 4;
            const targetY = (mouse.y * viewport.height) / 4;

            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);

            // Gentle rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
                <sphereGeometry args={[1.8, 64, 64]} />
                <MeshDistortMaterial
                    color="#f2f7f5"
                    speed={1.5}
                    distort={0.3}
                    radius={1}
                    metalness={0.1}
                    roughness={0.4}
                    emissive="#dcd6f7"
                    emissiveIntensity={0.15}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
};
