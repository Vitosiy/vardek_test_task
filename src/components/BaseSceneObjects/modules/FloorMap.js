import * as THREE from "three";
import {useEffect, useState} from "react";
import TextureLoader from "../../utils/TextureLoader";

/*
* Подложка с картой на сцене
* */

export default function FloorMap() {

    const [material, setMaterial] = useState(new THREE.MeshPhysicalMaterial({side: THREE.DoubleSide, }));

    let textureLoader = new TextureLoader()
    useEffect(() => {
        const callback = (result) => {
            let new_material = material.clone()

            for(let key in result){
                new_material[key] = result[key]
            }

            new_material.roughness = 0.7
            setMaterial(new_material)
        }

        textureLoader.load(callback, {
            map:         "./floor/floor.jpg",
            normalMap:   "./floor/floor_normal.png",
            aoMap:       "./floor/floor_ambient_occlusion.png",
            roughnessMap:"./floor/floor_roughness.png",
        }, new THREE.Vector2(50, 50))
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