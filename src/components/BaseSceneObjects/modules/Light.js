import {useThree} from "@react-three/fiber";
import * as THREE from "three";

/**
 *Свет на 3D сцене.
 */
export default function Light() {
    const {gl} = useThree()

    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap

    const shadow_const = 512 * 5
    const size_camera = 110

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
                shadow-bias={-0.0001}
                shadow-camera={new THREE.OrthographicCamera(-size_camera, size_camera, size_camera, -size_camera, 0.5, 1000)}
            />
        </>
    );
}
