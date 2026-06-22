import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei"
import type { Mesh } from "three"

function DistortedSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
    const { x, y } = state.pointer
    meshRef.current.rotation.x += y * 0.15
    meshRef.current.rotation.y += x * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#1a1033"
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function InnerSphere() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh scale={1.2}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#2d1b4e"
          emissiveIntensity={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color="#a855f7" />
      <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade speed={0.5} />
      <DistortedSphere />
      <InnerSphere />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/40 to-[#050508]" />
    </div>
  )
}
