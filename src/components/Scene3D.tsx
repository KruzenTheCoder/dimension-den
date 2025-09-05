import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Environment, Stars, Text, Plane } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Programming Languages and Code Editors floating around
function CodeEditors() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const editors = useMemo(() => {
    return [
      { name: 'React', color: '#61dafb', position: [8, 2, 4] },
      { name: 'Node.js', color: '#339933', position: [-8, -1, 3] },
      { name: 'TypeScript', color: '#3178c6', position: [6, -3, -5] },
      { name: 'Python', color: '#3776ab', position: [-6, 3, -4] },
      { name: 'JavaScript', color: '#f7df1e', position: [4, 5, 2] },
      { name: 'Next.js', color: '#ffffff', position: [-4, -4, 6] },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {editors.map((editor, i) => (
        <Float key={editor.name} speed={2 + i * 0.2} rotationIntensity={0.3} floatIntensity={2}>
          <group position={editor.position as [number, number, number]}>
            {/* Editor Window Frame */}
            <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#1a1a2e"
                emissive="#0d1117" 
                emissiveIntensity={0.2}
                roughness={0.3}
                metalness={0.1}
              />
            </Box>
            
            {/* Screen Content */}
            <Box args={[2.8, 1.8, 0.05]} position={[0, 0, 0.06]}>
              <meshStandardMaterial 
                color="#0d1117"
                emissive={editor.color}
                emissiveIntensity={0.1}
              />
            </Box>
            
            {/* Language Logo/Icon */}
            <Box args={[0.4, 0.4, 0.1]} position={[-1, 0.6, 0.1]}>
              <meshStandardMaterial 
                color={editor.color}
                emissive={editor.color}
                emissiveIntensity={0.6}
              />
            </Box>
            
            {/* Code Lines Effect */}
            {Array.from({ length: 6 }).map((_, lineIndex) => (
              <Box 
                key={lineIndex}
                args={[1.5 - (lineIndex * 0.2), 0.05, 0.02]} 
                position={[0.2, 0.4 - (lineIndex * 0.15), 0.12]}
              >
                <meshStandardMaterial 
                  color={editor.color}
                  emissive={editor.color}
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.8 - (lineIndex * 0.1)}
                />
              </Box>
            ))}
          </group>
        </Float>
      ))}
    </group>
  );
}

// Terminal Windows floating around
function TerminalWindows() {
  const terminalsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (terminalsRef.current) {
      terminalsRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
    }
  });

  const terminals = useMemo(() => {
    return [
      { command: '$ npm run dev', position: [10, 1, -2] },
      { command: '$ git commit', position: [-10, -2, 1] },
      { command: '$ yarn build', position: [7, -4, -6] },
      { command: '$ npm install', position: [-7, 4, 5] },
    ];
  }, []);

  return (
    <group ref={terminalsRef}>
      {terminals.map((terminal, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.2} floatIntensity={1.5}>
          <group position={terminal.position as [number, number, number]}>
            {/* Terminal Window */}
            <Box args={[2.5, 1.5, 0.08]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#000000"
                emissive="#00ff41" 
                emissiveIntensity={0.1}
                roughness={0.2}
                metalness={0.8}
              />
            </Box>
            
            {/* Terminal Screen */}
            <Box args={[2.3, 1.3, 0.04]} position={[0, 0, 0.05]}>
              <meshStandardMaterial 
                color="#0c0c0c"
                emissive="#00ff41"
                emissiveIntensity={0.2}
              />
            </Box>
            
            {/* Command Prompt Line */}
            <Box args={[1.8, 0.08, 0.02]} position={[0, 0.2, 0.08]}>
              <meshStandardMaterial 
                color="#00ff41"
                emissive="#00ff41"
                emissiveIntensity={0.8}
              />
            </Box>
            
            {/* Cursor */}
            <Box args={[0.05, 0.08, 0.02]} position={[0.9, 0.2, 0.08]}>
              <meshStandardMaterial 
                color="#00ff41"
                emissive="#00ff41"
                emissiveIntensity={1}
              />
            </Box>
          </group>
        </Float>
      ))}
    </group>
  );
}

// Floating Data Particles
function DataParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        child.position.y += Math.sin(time * 2 + i) * 0.001;
        child.rotation.z = time * (0.2 + i * 0.05);
      });
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const angle = (i / 25) * Math.PI * 2;
      const radius = 12 + Math.random() * 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 10;
      
      return {
        position: [x, y, z] as [number, number, number],
        color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
        size: 0.05 + Math.random() * 0.1,
      };
    });
  }, []);

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Box key={i} args={[particle.size, particle.size, particle.size]} position={particle.position}>
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </Box>
      ))}
    </group>
  );
}

// Central Holographic Core
function HolographicCore() {
  const coreRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={coreRef}>
        {/* Central Processing Core */}
        <Box args={[1, 1, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </Box>
        
        {/* Orbiting Data Rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <group key={i} rotation={[0, 0, (Math.PI / 3) * i]}>
            <Box args={[3 + i, 0.05, 0.05]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.6}
              />
            </Box>
            <Box args={[0.05, 3 + i, 0.05]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={0.6}
              />
            </Box>
          </group>
        ))}
      </group>
    </Float>
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
          <HolographicCore />
          <CodeEditors />
          <TerminalWindows />
          <DataParticles />
          
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