"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { TextureLoader } from "three"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import CropModal from "../../components/CropModal"

const CustomBox = ({ imageTexture, backCanvasTexture }: any) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { zoom, rotationX, rotationY, rotationZ, isPlaying, frameType, isCropping  } = useSelector((state: RootState) => state.frame)

  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(3, 2, 0.1)
    const uv = geo.attributes.uv as THREE.BufferAttribute
    const index = geo.index!
    const faceCount = index.count / 3

    for (let i = 0; i < faceCount; i++) {
      const face = Math.floor(i / 2)
      const offset = i * 3

      for (let j = 0; j < 3; j++) {
        const idx = index.getX(offset + j)
        let u = uv.getX(idx)
        let v = uv.getY(idx)

        switch (face) {
          case 0:
            u = 0.98
            break // Right
          case 1:
            u = 0.02
            break // Left
          case 2:
            v = 0.98
            break // Top
          case 3:
            v = 0.02
            break // Bottom
        }

        if (face < 4) {
          uv.setXY(idx, u, v)
        }
      }
    }

    uv.needsUpdate = true
    return geo
  }, [])

  // Frame materials based on frame type
  const frameColor = frameType === 1 ? "#5c3a21" : "#1a1a1a"
  const frontMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, side: THREE.FrontSide })
  const wrapMaterial = new THREE.MeshBasicMaterial({ color: frameColor, side: THREE.FrontSide })
  const backCanvasMaterial = new THREE.MeshBasicMaterial({ map: backCanvasTexture, side: THREE.FrontSide })

  const materials = [
    wrapMaterial, // right
    wrapMaterial, // left
    wrapMaterial, // top
    wrapMaterial, // bottom
    backCanvasMaterial, // back
    frontMaterial, // front
  ]

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.y = zoom
      meshRef.current.scale.z = zoom

      meshRef.current.rotation.x = rotationX
      meshRef.current.rotation.y = rotationY
      meshRef.current.rotation.z = rotationZ

      if (isPlaying) {
        meshRef.current.rotation.y += delta * 0.8
        meshRef.current.rotation.x += delta * 0.3
      }
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={materials} />
      <mesh position={[0, 0, -0.06]} scale={[0.95, 0.95, 1]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial map={backCanvasTexture} />
      </mesh>
    </group>
  )
}

const Frame3D = () => {
  const { viewMode, zoom, frameType, isCropping ,isMirrored  } = useSelector((state: RootState) => state.frame)

  const imageURL =
    "https://st2.depositphotos.com/1591133/8812/i/450/depositphotos_88120646-stock-photo-idyllic-summer-landscape-with-clear.jpg"
  const backCanvasURL =
    "https://static.vecteezy.com/system/resources/previews/011/392/870/large_2x/back-side-of-primed-canvas-stretched-over-frame-photo.jpg"

  // Room background image URL - replace with your actual room image
  const roomBackgroundURL = "/room-background.jpg"

  const imageTexture = useLoader(TextureLoader, imageURL)
  const backCanvasTexture = useLoader(TextureLoader, backCanvasURL)
  const handlePaymentRedirect = () => {
    window.location.href = "https://suyashaa123-15507.bubbleapps.io/version-test?debug_mode=true"
  }
  // Room view with 2D background
  if (viewMode === "room") {
    // Calculate frame dimensions based on zoom
    const frameWidth = 300 * zoom
    const frameHeight = 200 * zoom
    const borderWidth = frameType === 1 ? 15 : 25
    const frameColor = frameType === 1 ? "#5c3a21" : "#1a1a1a"

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${roomBackgroundURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Frame on wall */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            padding: `${borderWidth}px`,
            backgroundColor: frameColor,
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageURL || "/placeholder.svg"}
            alt="Framed Picture"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    )
  }

  // 3D view
  return (
    <>
    {isCropping && imageTexture && (
        <CropModal
          imageSrc={imageURL}
          onCropComplete={(croppedBlob) => {
            const newURL = URL.createObjectURL(croppedBlob)
            // Safe update of texture image
            if (imageTexture.image) {
              imageTexture.image.src = newURL
              imageTexture.needsUpdate = true
            }
          }}
        />
      )}
    <Canvas
      style={{ height: "100%", width: "100%" }}
      shadows={false}
      gl={{ toneMapping: THREE.NoToneMapping }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[0, 0, 5]} intensity={1} />
      <Environment preset="city" />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={1.5} far={4.5} />

      <CustomBox imageTexture={imageTexture} backCanvasTexture={backCanvasTexture} />
      <OrbitControls />
    </Canvas>
       {/* Payment Button */}
       <div style={{ position: "absolute", bottom: 20, width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            onClick={handlePaymentRedirect}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            Payment Here
          </button>
        </div>
    </>
  )
}

export default Frame3D
