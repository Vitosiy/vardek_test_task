import {useEffect, useState} from 'react';
import {useThree} from "@react-three/fiber";
import SelectedControl from "./modules/SelectedControl";

export default function EventController() {

    let three = useThree()
    let {gl, set} = three

    const sceneRef = gl.domElement
    const [selectedControl] = useState(new SelectedControl({dom: sceneRef, three}))

    useEffect(() => {
        const onClick = (_event) => {
            let event = _event.detail
            selectedControl.onClick(event)
        }

        const onPointerMove = (_event) => {
            let event = _event.detail
            selectedControl.onPointerMove(event)
        }

        const onPointerOver = (_event) => {
            let event = _event.detail
            selectedControl.onPointerOver(event)
        }

        const onPointerOut = (_event) => {
            let event = _event.detail
            selectedControl.onPointerOut(event)
        }

        const onContextMenu = (_event) => {
            let event = _event.detail
            selectedControl.onContextMenu(event)
        }

        const onPointerMissed = (event) => {
            selectedControl.onPointerMissed(event)
        }

        sceneRef.addEventListener('clickMesh', onClick)
        sceneRef.addEventListener('pointerMoveMesh', onPointerMove)
        sceneRef.addEventListener('pointerOverMesh', onPointerOver)
        sceneRef.addEventListener('pointerOutMesh', onPointerOut)
        sceneRef.addEventListener('contextMenuMesh', onContextMenu)
        set({onPointerMissed}, false)

        return () => {
            sceneRef.removeEventListener('clickMesh', onClick)
            sceneRef.removeEventListener('pointerMoveMesh', onPointerMove)
            sceneRef.removeEventListener('pointerOverMesh', onPointerOver)
            sceneRef.removeEventListener('pointerOutMesh', onPointerOut)
            sceneRef.removeEventListener('contextMenuMesh', onContextMenu)
        }
    }, [])

    return null;
}