import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import TextureLoader from "../../utils/TextureLoader";

export default function TorusKnotModel(props) {
    const ref = useRef()

    const [material, setMaterial] = useState(new THREE.MeshPhysicalMaterial())

    const position = props.position || new THREE.Vector3(50, 20, 50)
    const knotRadius = props.knotRadius || 10
    const tubeRadius = props.tubeRadius || 2

    const geometry = new THREE.TorusKnotGeometry( knotRadius, tubeRadius, 100, 16 );

    let textureLoader = new TextureLoader()
    useEffect(() => {
        const callback = (result) => {
            let new_material = material.clone()

            for(let key in result){
                let texture = result[key]
                texture.rotation = 1.5708

                new_material[key] = texture
            }

            new_material.metalness = 0.4
            new_material.roughness = 0.8
            setMaterial(new_material)
        }

        textureLoader.load(callback, {
            map:         "./textures/torus.jpg",
            normalMap:   "./textures/torus_normal.png",
            aoMap:       "./textures/torus_ao.png",
            roughnessMap:"./textures/torus_roughness.png",
            metalnessMap:"./textures/torus_metallic.png",
        }, new THREE.Vector2(1, 16))
    }, []);

    //Анимация вращения (просто так :-))
    useFrame(({ clock }) => {
        ref.current.rotation.x = clock.getElapsedTime()
        ref.current.rotation.y = clock.getElapsedTime()
    })

    return(
        <mesh
            ref={ref}
            geometry={geometry}
            material={material}
            position={position}
            castShadow
            receiveShadow
        />
    )
}