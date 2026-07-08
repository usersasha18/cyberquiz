import { useGLTF } from "@react-three/drei";
import modelUrl from "../../assets/Untitled1.glb";

export default function Modal() {
  const { scene } = useGLTF(modelUrl);

  return <primitive object={scene} scale={4} />;
}