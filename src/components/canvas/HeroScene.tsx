import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, TorusKnot } from "@react-three/drei"
import type { Group, Mesh } from "three"

function CoreShape() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + x * 0.2
    groupRef.current.rotation.x = y * 0.15
  })

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <TorusKnot args={[1, 0.28, 128, 16]}>
          <meshStandardMaterial
            color="#525252"
            emissive="#1a1a1a"
            emissiveIntensity={0.5}
            roughness={0.35}
            metalness={0.9}
            wireframe
          />
        </TorusKnot>
      </Float>
    </group>
  )
}

function OrbitingParticles() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })
  return (
    <group ref={ref}>
      <Sparkles count={40} scale={7} size={1} speed={0.15} color="#737373" opacity={0.3} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={1} color="#fafafa" />
      <pointLight position={[-4, -2, 4]} intensity={0.4} color="#525252" />
      <CoreShape />
      <OrbitingParticles />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 opacity-90">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
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
            "linear-gradient(105deg, #080808 0%, transparent 45%), linear-gradient(180deg, transparent 60%, #080808 100%)",
        }}
      />
    </div>
  )
}
