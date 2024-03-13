import {useThree} from "@react-three/fiber";
import * as THREE from "three";

/**
 *Основной компонент света на 3D сцене.
 */
export default function Light() {
    const {gl} = useThree()

    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap

    const shadow_const = 512 * 4
    const size_camera = 1000

    return (
        <>
            <hemisphereLight
                intensity={0.4}
                castShadow={false}
            />
            <directionalLight
                castShadow={true}
                position={[-50, 80, -50]}
                intensity={0.7}
                shadow-mapSize={[shadow_const, shadow_const]}
            >
                <orthographicCamera
                    attach="shadow-camera"
                    args={[-size_camera, size_camera, size_camera, -size_camera, -1000, 1000]}
                />
            </directionalLight>
        </>
    );
}
