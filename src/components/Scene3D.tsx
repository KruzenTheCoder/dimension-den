import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, Box, Environment, Text, Cylinder, Octahedron } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main sphere with gradient material */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 64, 64]} position={[-3, 1, 0]}>
          <meshStandardMaterial 
            color="#8B5CF6" 
            roughness={0.05} 
            metalness={0.9}
            emissive="#4C1D95"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>
      
      {/* Torus with glowing effect */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Torus args={[1.5, 0.4, 16, 100]} position={[3, -1, 0]}>
          <meshStandardMaterial 
            color="#06B6D4" 
            roughness={0.05} 
            metalness={0.9}
            emissive="#0891B2"
            emissiveIntensity={0.15}
          />
        </Torus>
      </Float>
      
      {/* Floating cube */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <Box args={[1.5, 1.5, 1.5]} position={[0, 3, -2]}>
          <meshStandardMaterial 
            color="#F59E0B" 
            roughness={0.05} 
            metalness={0.9}
            emissive="#D97706"
            emissiveIntensity={0.1}
          />
        </Box>
      </Float>

      {/* Additional geometric shapes for more complexity */}
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <Octahedron args={[0.8]} position={[-1, -2, 1]}>
          <meshStandardMaterial 
            color="#EF4444" 
            roughness={0.1} 
            metalness={0.8}
            emissive="#DC2626"
            emissiveIntensity={0.1}
          />
        </Octahedron>
      </Float>

      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.2}>
        <Cylinder args={[0.5, 0.5, 2, 8]} position={[1.5, 1.5, 2]}>
          <meshStandardMaterial 
            color="#10B981" 
            roughness={0.1} 
            metalness={0.8}
            emissive="#059669"
            emissiveIntensity={0.1}
          />
        </Cylinder>
      </Float>

      {/* Small orbiting particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={3 + i * 0.1} rotationIntensity={2} floatIntensity={3}>
            <Sphere args={[0.1, 16, 16]} position={[x, Math.sin(i) * 2, z]}>
              <meshStandardMaterial 
                color={`hsl(${i * 30}, 70%, 60%)`}
                emissive={`hsl(${i * 30}, 70%, 40%)`}
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <fog attach="fog" args={['#0a0a0a', 8, 25]} />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
          
          {/* Multiple colored lights for atmosphere */}
          <pointLight position={[-8, 4, -8]} color="#8B5CF6" intensity={0.8} />
          <pointLight position={[8, -4, 8]} color="#06B6D4" intensity={0.8} />
          <pointLight position={[0, 8, 0]} color="#F59E0B" intensity={0.6} />
          <pointLight position={[-4, -8, 4]} color="#EF4444" intensity={0.6} />
          
          {/* Rim lighting */}
          <directionalLight position={[-10, 0, -10]} color="#8B5CF6" intensity={0.3} />
          <directionalLight position={[10, 0, 10]} color="#06B6D4" intensity={0.3} />
          
          <FloatingObjects />
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}