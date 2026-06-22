import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sparkles, TorusKnot } from "@react-three/drei"
import type { Group, Mesh } from "three"

function CoreShape() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 + x * 0.4
    groupRef.current.rotation.x = y * 0.3
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
        <TorusKnot args={[1.1, 0.32, 128, 16]}>
          <MeshDistortMaterial
            color="#00f0ff"
            emissive="#001a33"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
            distort={0.25}
            speed={3}
            wireframe
          />
        </TorusKnot>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#7b2fff"
            emissive="#2d0055"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

function OrbitingParticles() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })
  return (
    <group ref={ref}>
      <Sparkles count={120} scale={8} size={2} speed={0.3} color="#00f0ff" opacity={0.6} />
      <Sparkles count={80} scale={6} size={1.5} speed={0.5} color="#bf00ff" opacity={0.4} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#00f0ff" />
      <pointLight position={[-8, -4, 4]} intensity={1.5} color="#7b2fff" />
      <pointLight position={[0, -8, 0]} intensity={0.8} color="#ff006e" />
      <CoreShape />
      <OrbitingParticles />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #030014 75%)",
        }}
      />
    </div>
  )
}
