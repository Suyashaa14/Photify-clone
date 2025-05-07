import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const CustomBox = ({ imageTexture, backCanvasTexture }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { zoom, rotationX, rotationY, rotationZ, isPlaying } = useSelector((state: RootState) => state.frame);


  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(3, 2, 0.1);
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    const index = geo.index!;
    const faceCount = index.count / 3;

    for (let i = 0; i < faceCount; i++) {
      const face = Math.floor(i / 2);
      const offset = i * 3;

      for (let j = 0; j < 3; j++) {
        const idx = index.getX(offset + j);
        let u = uv.getX(idx);
        let v = uv.getY(idx);

        switch (face) {
          case 0: u = 0.98; break; // Right
          case 1: u = 0.02; break; // Left
          case 2: v = 0.98; break; // Top
          case 3: v = 0.02; break; // Bottom
        }

        if (face < 4) {
          uv.setXY(idx, u, v);
        }
      }
    }

    uv.needsUpdate = true;
    return geo;
  }, []);

  const frontMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, side: THREE.FrontSide });
  const wrapMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, side: THREE.FrontSide });
  const backCanvasMaterial = new THREE.MeshBasicMaterial({ map: backCanvasTexture, side: THREE.FrontSide });

  const materials = [
    wrapMaterial,         // right
    wrapMaterial,         // left
    wrapMaterial,         // top
    wrapMaterial,         // bottom
    backCanvasMaterial,   // back
    frontMaterial,        // front
  ];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.y = zoom;
      meshRef.current.scale.z = zoom;
  
      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.y = rotationY;
      meshRef.current.rotation.z = rotationZ;
  
      if (isPlaying) {
        meshRef.current.rotation.y += delta * 0.8;
        meshRef.current.rotation.x += delta * 0.3;
      }
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={materials} />
      <mesh position={[0, 0, -0.06]} scale={[0.95, 0.95, 1]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial map={backCanvasTexture} />
      </mesh>
    </group>
  );
};

const Frame3D = () => {
  const { viewMode } = useSelector((state: RootState) => state.frame);

  const imageURL = 'https://st2.depositphotos.com/1591133/8812/i/450/depositphotos_88120646-stock-photo-idyllic-summer-landscape-with-clear.jpg';
  const backCanvasURL = 'https://static.vecteezy.com/system/resources/previews/011/392/870/large_2x/back-side-of-primed-canvas-stretched-over-frame-photo.jpg';

  const imageTexture = useLoader(TextureLoader, imageURL);
  const backCanvasTexture = useLoader(TextureLoader, backCanvasURL);

  if (viewMode === 'room') {
    // ✅ Flat 2D image view
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src={imageURL} alt="Flat View" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    );
  }

  return (
    <Canvas
      style={{ height: '100%', width: '100%' }}
      shadows={false}
      gl={{ toneMapping: THREE.NoToneMapping }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
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
  );
};

export default Frame3D;
