import {useEffect, useState} from 'react'
import * as THREE from "three";
import {useThree} from "@react-three/fiber";

import front from "../../../img/skybox/sky_front.png";
import back from "../../../img/skybox/sky_back.png";
import top from "../../../img/skybox/sky_top.png";
import bottom from "../../../img/skybox/sky_bottom.png";
import left from "../../../img/skybox/sky_left.png";
import right from "../../../img/skybox/sky_right.png";

//Массив изображений фона в правильном порядке
const texture_images = [
    front,
    back,
    top,
    bottom,
    left,
    right,
]

/**
 * Создание неба на 3D сцене
 */
export default function SkyBox() {

    const [sky_texture, SetSky] = useState(false);
    const { gl,scene } = useThree();
    gl.autoClear = false;

    const texture_loader = new THREE.CubeTextureLoader()

    if(!sky_texture)
            texture_loader.load(texture_images, texture => {
                SetSky(texture)
            })

    useEffect(e => {
        if(sky_texture)
            scene.background = sky_texture
    }, [sky_texture])

    return null
}