import * as THREE from "three";

export default class TextureLoader{
    constructor() {
        this.loader = new THREE.TextureLoader()
    }

    load(callback, url_textures = {}, repeatVector = new THREE.Vector2(1, 1)) {

        let loadingTextures = new Promise((resolve) => {

            let textures = {}

            for (let key in url_textures){
                let texture = this.loader.load(url_textures[key])
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.copy( repeatVector );

                textures[key] = texture
            }

            resolve(textures)
        })

        loadingTextures.then(result => callback(result))
    }
}