import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, Box, Environment, Stars } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Simplified Holographic Elements
function HolographicElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            roughness={0.1} 
            metalness={0.9}
            emissive="#0080ff"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting Rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <Torus args={[2 + i * 1.5, 0.1, 8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 4 * i, 0, 0]}>
            <meshStandardMaterial 
              color={`hsl(${180 + i * 30}, 100%, 60%)`}
              emissive={`hsl(${180 + i * 30}, 100%, 40%)`}
              emissiveIntensity={0.3}
            />
          </Torus>
        </Float>
      ))}

      {/* Data Nodes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 2;
        
        return (
          <Float key={i} speed={3 + i * 0.1} rotationIntensity={1} floatIntensity={2}>
            <Box args={[0.3, 0.3, 0.3]} position={[x, y, z]}>
              <meshStandardMaterial 
                color="#ff00ff"
                emissive="#ff0080"
                emissiveIntensity={0.4}
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Simplified Energy Particles
function EnergyParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        child.position.y = Math.sin(time * 1.5 + i) * 6;
        child.rotation.y = time * (0.5 + i * 0.1);
      });
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      return {
        position: [x, Math.random() * 12 - 6, z] as [number, number, number],
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: 0.1 + Math.random() * 0.2,
      };
    });
  }, []);

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.size, 8, 8]} position={particle.position}>
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Simplified Buildings
function CyberpunkBuildings() {
  const buildingsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (buildingsRef.current) {
      buildingsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const buildings = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 20 + Math.random() * 8;
      const height = 3 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      return {
        position: [x, -height/2, z] as [number, number, number],
        scale: [1 + Math.random() * 1.5, height, 1 + Math.random() * 1.5] as [number, number, number],
        color: `hsl(${180 + Math.random() * 60}, 60%, ${25 + Math.random() * 15}%)`,
        emissive: `hsl(${180 + Math.random() * 60}, 70%, 15%)`,
      };
    });
  }, []);

  return (
    <group ref={buildingsRef}>
      {buildings.map((building, i) => (
        <Box key={i} args={[1, 1, 1]} position={building.position} scale={building.scale}>
          <meshStandardMaterial
            color={building.color}
            emissive={building.emissive}
            emissiveIntensity={0.1}
            roughness={0.7}
            metalness={0.3}
          />
        </Box>
      ))}
    </group>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 5, 12], fov: 70 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Environment and Atmosphere */}
          <Environment preset="night" />
          <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade speed={0.5} />
          <fog attach="fog" args={['#0a0a1a', 12, 50]} />
          
          {/* Simplified Lighting */}
          <ambientLight intensity={0.3} color="#1a1a2e" />
          <directionalLight position={[10, 15, 10]} intensity={0.6} color="#00ccff" />
          <pointLight position={[0, 8, 0]} color="#00ffff" intensity={0.8} distance={25} />
          <pointLight position={[-12, 4, -12]} color="#ff00ff" intensity={0.6} distance={20} />
          <pointLight position={[12, 4, 12]} color="#ffff00" intensity={0.4} distance={18} />
          
          {/* World Elements */}
          <CyberpunkBuildings />
          <HolographicElements />
          <EnergyParticles />
          
          {/* Camera Controls */}
          <OrbitControls 
            enableZoom={true}
            minDistance={6}
            maxDistance={20}
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 4}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}