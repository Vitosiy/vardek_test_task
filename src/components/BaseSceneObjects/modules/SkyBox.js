import {useEffect, useState} from 'react'
import * as THREE from "three";
import {useThree} from "@react-three/fiber";

/**
 * Создание неба на 3D сцене
 */
export default function SkyBox() {

    const [sky_texture, SetSky] = useState(false);
    const { gl,scene } = useThree();
    gl.autoClear = false;

    //Массив изображений фона в правильном порядке
    const texture_images = [
        "./skybox/sky_front.png",
        "./skybox/sky_back.png",
        "./skybox/sky_top.png",
        "./skybox/sky_bottom.png",
        "./skybox/sky_left.png",
        "./skybox/sky_right.png",
    ]

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