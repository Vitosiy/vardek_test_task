import {Suspense, useMemo, useRef, useState} from "react";
import {useThree} from "@react-three/fiber";
import * as THREE from "three";
import * as DREI from '@react-three/drei'

import LoadingManager from "../../utils/LoadingManager";

//Добавляет дверь из 3D модели (не используется)
export default function DoorModel(props) {
    const ref = useRef()
    const [model, setModel] = useState(false);
    const position = props.position || new THREE.Vector3(0, 0, 0)

    const {gl} = useThree()
    const three_dom_elem = gl.domElement

    //Загружаем модель стадиона
    useMemo(() => {
        if (!model) {
            LoadingManager.getModels("./Door.glb", (result) => {
                result.objectType = "door"
                setModel(result)
            })
        }
    }, [model]);

    return (
        <Suspense fallback={null}>
            {model && (
                <DREI.Clone
                    ref={ref}
                    object={model}
                    position={position}
                    objectType="door"
                    castShadow
                    receiveShadow
                    onContextMenu={(event) => three_dom_elem.dispatchEvent(new CustomEvent("create_menu",
                        {
                            detail:{
                                points: [event.offsetX, event.offsetY],
                                object: ref.current,
                            }
                        }))}
                />
            )}
        </Suspense>
    )
}