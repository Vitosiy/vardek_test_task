import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

import TextureLoader from "../../utils/TextureLoader";

export default function CubeModel(props) {
    const ref = useRef()

    const [material, setMaterial] = useState(new THREE.MeshPhysicalMaterial())

    const position = props.position || new THREE.Vector3(-50, 12, -50)
    const size = props.size || 10

    const geometry = new THREE.BoxGeometry( size, size, size );

    //Загрузка текстур для модели
    let textureLoader = new TextureLoader()
    useEffect(() => {
        const callback = (result) => {
            let new_material = material.clone()

            for(let key in result){
                new_material[key] = result[key]
            }

            new_material.metalness = 0.5
            new_material.roughness = 0.7
            setMaterial(new_material)
        }

        textureLoader.load(callback, {
            map:         "./textures/cube.jpg",
            normalMap:   "./textures/cube_normal.png",
            aoMap:       "./textures/cube_ao.png",
            roughnessMap:"./textures/cube_roughness.png",
            metalnessMap:"./textures/cube_metallic.png",
            alphaMap:    "./textures/cube_opacity.png",
        })
    }, []);

    //Анимация вращения
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