import * as THREE from "three";

export default class Utils {
    static DegToRad(deg) {
        return deg * (Math.PI / 180)
    }

    static RadToDeg(rad) {
        return rad * (180 / Math.PI)
    }

    //Изменение параметра emissive (если он есть), для интерактивной подсветки объекта
    static colorizeSelectedModel(mesh, color = new THREE.Color("black")){

        if(mesh.material){
            if(Array.isArray(mesh.material)) {
                for (let item of mesh.material)
                    item.emissive?.set(color)
            }
            else
                mesh.material.emissive?.set(color)
        }

        for (let child of mesh.children) {
            this.colorizeSelectedModel(child, color)
        }
    }
}