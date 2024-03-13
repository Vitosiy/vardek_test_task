import * as THREE from "three";

import {Canvas} from "@react-three/fiber";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import Controllers from "./Controllers/Controllers";
import BaseSceneObjects from "./BaseSceneObjects/BaseSceneObjects";
import View3D from "./View3D/View3D";


//Оптимизация raycaster-а с 3D объектами
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;
//

const raycaster_params = {              //Параметры raycaster-а, которые будут переданы компоненту Canvas
    params: {
        Line: {threshold: 0.1},                      //настройка точности
        Points: {threshold: 0.1}
    },
    firstHitOnly: true
}

const camera_params = {                 //Параметры камеры, которые будут переданы компоненту Canvas
    position: [250, 100, 250]                       //стартовая позиция в пространстве
}

/**
 * Создание сцены Three.js
 */
export default function Three() {
    return (
        <Canvas
            raycaster={raycaster_params}
            camera={camera_params}
        >
            <Controllers/>
            <BaseSceneObjects/>
            <View3D/>
        </Canvas>
    );
}
