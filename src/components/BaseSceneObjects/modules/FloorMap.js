import * as THREE from "three";
import {useEffect, useState} from "react";

/*
* Подложка с картой на сцене
* */

export default function FloorMap() {

    const [material, setMaterial] = useState(new THREE.MeshPhysicalMaterial({side: THREE.DoubleSide, }));

    let textureLoader = new THREE.TextureLoader()
    useEffect(() => {

        let loadingTextures = new Promise(function (resolve){

            let new_material = material.clone()
            let repeatVector = new THREE.Vector2(8, 8)

            new_material.map = textureLoader.load('./floor/floor.jpg')
            new_material.map.wrapS = THREE.RepeatWrapping;
            new_material.map.wrapT = THREE.RepeatWrapping;
            new_material.map.repeat.copy( repeatVector );

            new_material.normalMap = textureLoader.load('./floor/floor_normal.png')
            new_material.normalMap.wrapS = THREE.RepeatWrapping;
            new_material.normalMap.wrapT = THREE.RepeatWrapping;
            new_material.normalMap.repeat.copy( repeatVector );

            new_material.aoMap = textureLoader.load('./floor/floor_ambient_occlusion.png')
            new_material.aoMap.wrapS = THREE.RepeatWrapping;
            new_material.aoMap.wrapT = THREE.RepeatWrapping;
            new_material.aoMap.repeat.copy( repeatVector );

            new_material.roughnessMap = textureLoader.load('./floor/floor_roughness.png')
            new_material.roughnessMap.wrapS = THREE.RepeatWrapping;
            new_material.roughnessMap.wrapT = THREE.RepeatWrapping;
            new_material.roughnessMap.repeat.copy( repeatVector );

            resolve(new_material)
        })

        loadingTextures.then(result => setMaterial(result))

    }, []);

    let geometry = new THREE.PlaneGeometry(630,630)
    geometry.rotateX(-Math.PI / 2);
    geometry.rotateY(-Math.PI / 2);
    geometry.translate(0,-0.01,0);

    return (
        <mesh
            receiveShadow={true}
            geometry={geometry}
            material={material}
        />
    )
}