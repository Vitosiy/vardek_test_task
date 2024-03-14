import {useEffect, useRef, useState} from "react";
import {useThree} from "@react-three/fiber";

import * as THREE from "three";
import * as DREI from '@react-three/drei'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

import Utils from "../../utils/Utils";
import TextureLoader from "../../utils/TextureLoader";

//Рисует модель двери силами Three.js
export default function DoorThreeModel(props){
    const ref = useRef()

    const [material, setMaterial] = useState([])

    const {gl} = useThree()
    const three_dom_elem = gl.domElement

    const position = props.position || new THREE.Vector3(0, 0, 0)
    const width = props.width || 3
    const height = props.width || 5
    const depth = props.width || 0.1

    let door_geometry = new THREE.BoxGeometry(width, height, depth)
    door_geometry.translate(0, height * 0.5, 0)

    let door_handle_geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3)
    door_handle_geometry.rotateX(Utils.DegToRad(90))
    door_handle_geometry.translate(-width * 0.42, height * 0.5, 0)

    let single_door_geometry =  BufferGeometryUtils.mergeGeometries([door_geometry, door_handle_geometry], true)
    single_door_geometry.computeBoundsTree();

    //Загрузка текстур для модели
    let textureLoader = new TextureLoader()
    useEffect(() => {
        let new_material_array = []
        const callbackWood = (result) => {
            let new_material = new THREE.MeshPhysicalMaterial({side: THREE.DoubleSide})

            for(let key in result){
                new_material[key] = result[key]
            }

            new_material.roughness = 0.6
            new_material_array.push(new_material)
        }

        const callbackMetal = (result) => {
            let new_material = new THREE.MeshPhysicalMaterial({side: THREE.DoubleSide})

            for(let key in result){
                new_material[key] = result[key]
            }

            new_material.metalness = 0.3
            new_material.roughness = 0.5
            new_material_array.push(new_material)

            setMaterial(new_material_array)
        }

        textureLoader.load(callbackWood, {
            map:         "./textures/wood.jpg",
            normalMap:   "./textures/wood_normal.png",
            aoMap:       "./textures/wood_ao.png",
            roughnessMap:"./textures/wood_roughness.png",
        }, new THREE.Vector2(2, 1))

        textureLoader.load(callbackMetal, {
            map:         "./textures/metal.jpg",
            normalMap:   "./textures/metal_normal.png",
            aoMap:       "./textures/metal_ao.png",
            roughnessMap:"./textures/metal_roughness.png",
            metalnessMap:"./textures/metal_metallic.png",
        }, new THREE.Vector2(6, 6))
    }, []);

    let object = new THREE.Mesh(single_door_geometry)
    let unionBoundingBox = Utils.unionBoundingBox(object)

    if(material.length)
        return (
            <DREI.Clone
                ref={ref}
                object={object}
                material={material}
                position={position}
                unionBoundingBox={unionBoundingBox}
                objectType="door"
                castShadow
                receiveShadow
                onContextMenu={(event) => three_dom_elem.dispatchEvent(new CustomEvent("create_menu",
                    {
                        detail: {
                            points: [event.offsetX, event.offsetY],
                            object: ref.current,
                        }
                    }))
                }
                onPointerOver={(event) => {
                    if (!event.buttons)
                        Utils.colorizeSelectedModel(ref.current, new THREE.Color(0x757575))
                }}
                onPointerOut={(event) => {
                    if (!event.buttons)
                        Utils.colorizeSelectedModel(ref.current)
                }}
            />
        )
    else
        return null

}