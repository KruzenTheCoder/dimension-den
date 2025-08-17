import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, Box, Environment, Stars, Plane, Octahedron } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Cyberpunk City Buildings
function CyberpunkBuildings() {
  const buildingsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (buildingsRef.current) {
      buildingsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const buildings = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      const height = 5 + Math.random() * 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      return {
        position: [x, -height/2, z] as [number, number, number],
        scale: [1 + Math.random() * 2, height, 1 + Math.random() * 2] as [number, number, number],
        color: `hsl(${180 + Math.random() * 60}, 70%, ${30 + Math.random() * 20}%)`,
        emissive: `hsl(${180 + Math.random() * 60}, 80%, 20%)`,
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
            roughness={0.8}
            metalness={0.2}
          />
        </Box>
      ))}
    </group>
  );
}

// Floating Holographic Elements
function HolographicElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        child.rotation.z = state.clock.elapsedTime * (0.3 + i * 0.05);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            roughness={0.1} 
            metalness={0.9}
            emissive="#0080ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting Rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <Torus args={[2 + i * 1.5, 0.1, 8, 64]} position={[0, 0, 0]} rotation={[Math.PI / 4 * i, 0, 0]}>
            <meshStandardMaterial 
              color={`hsl(${180 + i * 30}, 100%, 60%)`}
              emissive={`hsl(${180 + i * 30}, 100%, 40%)`}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Torus>
        </Float>
      ))}

      {/* Data Nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 2;
        
        return (
          <Float key={i} speed={3 + i * 0.1} rotationIntensity={2} floatIntensity={3}>
            <Octahedron args={[0.3]} position={[x, y, z]}>
              <meshStandardMaterial 
                color="#ff00ff"
                emissive="#ff0080"
                emissiveIntensity={0.4}
                wireframe={i % 2 === 0}
              />
            </Octahedron>
          </Float>
        );
      })}
    </group>
  );
}

// Energy Particles System
function EnergyParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        child.position.y = Math.sin(time * 2 + i) * 8;
        child.rotation.y = time * (1 + i * 0.1);
      });
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 20 + Math.random() * 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      return {
        position: [x, Math.random() * 16 - 8, z] as [number, number, number],
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: 0.05 + Math.random() * 0.1,
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
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Ground Grid
function CyberGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
      }
    }
  });

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#00ffff') },
        color2: { value: new THREE.Color('#ff00ff') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        void main() {
          vec2 grid = fract(vUv * 20.0);
          float line = step(0.05, grid.x) * step(0.05, grid.y);
          
          vec3 color = mix(color1, color2, sin(time + vUv.x * 10.0) * 0.5 + 0.5);
          float alpha = (1.0 - line) * 0.3 + sin(time * 2.0 + vUv.x * 5.0) * 0.1;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <Plane ref={gridRef} args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
      <primitive object={gridMaterial} attach="material" />
    </Plane>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 5, 12], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Environment and Atmosphere */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <fog attach="fog" args={['#0a0a1a', 15, 60]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} color="#1a1a2e" />
          <directionalLight position={[10, 20, 10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[0, 10, 0]} color="#00ffff" intensity={1} distance={30} />
          <pointLight position={[-15, 5, -15]} color="#ff00ff" intensity={0.8} distance={25} />
          
          {/* World Elements */}
          <CyberGrid />
          <CyberpunkBuildings />
          <HolographicElements />
          <EnergyParticles />
          
          {/* Camera Controls */}
          <OrbitControls 
            enableZoom={true}
            minDistance={8}
            maxDistance={25}
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
            enableDamping
            dampingFactor={0.03}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}