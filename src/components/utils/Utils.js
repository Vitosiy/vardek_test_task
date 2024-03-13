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

    //Получение из url расширения файла
    static parseExtension(url){
        return url.split(".").pop()
    }

    static unionBoundingBox(model) {

        let boundingBox = new THREE.Box3();

        if (model.geometry) {
            model.geometry.computeBoundingBox();
            boundingBox = model.geometry.boundingBox.clone();
            if (boundingBox.min.length() === Infinity || boundingBox.max.length() === Infinity) {
                return null;
            }
        }

        for (let child of model.children) {
            boundingBox.union(this.unionBoundingBox(child));
        }

        return boundingBox;
    }
}