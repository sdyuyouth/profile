import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, TorusKnot } from "@react-three/drei"
import type { Group, Mesh } from "three"

function CoreShape() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 + x * 0.25
    groupRef.current.rotation.x = y * 0.2
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
        <TorusKnot args={[1.1, 0.32, 128, 16]}>
          <meshStandardMaterial
            color="#52525b"
            emissive="#27272a"
            emissiveIntensity={0.4}
            roughness={0.4}
            metalness={0.85}
            wireframe
          />
        </TorusKnot>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh scale={0.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#71717a"
            emissive="#18181b"
            emissiveIntensity={0.6}
            transparent
            opacity={0.35}
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
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })
  return (
    <group ref={ref}>
      <Sparkles count={60} scale={8} size={1.2} speed={0.2} color="#a1a1aa" opacity={0.35} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#fafafa" />
      <pointLight position={[-6, -4, 4]} intensity={0.6} color="#6366f1" />
      <CoreShape />
      <OrbitingParticles />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
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
          background: "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 0%, #09090b 72%)",
        }}
      />
    </div>
  )
}
