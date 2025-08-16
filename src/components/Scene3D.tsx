import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, Box, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function FloatingObjects() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.8, 32, 32]} position={[-2, 1, 0]}>
          <meshStandardMaterial color="#8B5CF6" roughness={0.1} metalness={0.8} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Torus args={[1, 0.3, 16, 32]} position={[2, -1, 0]}>
          <meshStandardMaterial color="#06B6D4" roughness={0.1} metalness={0.8} />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <Box args={[1.2, 1.2, 1.2]} position={[0, 2, -1]}>
          <meshStandardMaterial color="#F59E0B" roughness={0.1} metalness={0.8} />
        </Box>
      </Float>
    </>
  );
}

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#06B6D4" intensity={0.5} />
          
          <FloatingObjects />
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}