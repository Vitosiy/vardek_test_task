import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

//Менеджер загрузки 3D моделей с сервера
export default class LoadingManager {

    //Метод для указания пути, по которому загружаем модели
    static getModels(model_path, callback, callback_error) {

        let extension = parseExtension(model_path).toUpperCase() || "";

        if (extension === "GLB") {
            extension = "GLTF";
        }

        let loader = this["load" + extension]();

        if (!loader) {
            return;
        }

        let loadModel = (materialLibraries) => {

            if (materialLibraries) {
                loader.setMaterials(materialLibraries);
            }

            loader.load(
                model_path,
                // После завершения
                (geometry) => {
                    this.finishLoading(geometry, callback, extension);
                },
                () => {
                },
                () => {
                    callback_error && callback_error();
                },
            );
        };

        loadModel();
    }

    static finishLoading(geometry, callback, extension) {

        switch (extension) {
            case "GLTF":
                geometry = geometry.scene;
                break;
            default:
                return;
        }

        let isModel = geometry.type !== "BufferGeometry";
        let model = isModel ? geometry : new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xeeeeee, side: THREE.DoubleSide}));
        model.matrixAutoUpdate = false;
        //Передвигаем все вершины таким образом, чтобы отсчет модели всегда начинался от 0, 0
        this.calculateModelInSpace(model);

        callback(model);
    }

    //Пересчет геометрии модели
    static calculateModelInSpace(model) {

        const box = new THREE.Box3();
        const center = new THREE.Vector3()
        const translateVector = new THREE.Vector3()

        //Центровка внутренней геометрии и поднятие по оси Y, чтоб minY = 0
        const calculateTranslateVector = () => {
            translateVector.x = center.x !== 0 ? -center.x : 0

            translateVector.y = box.min.y !== 0 ? -box.min.y : 0

            translateVector.z = center.z !== 0 ? -center.z : 0
        }

        const translateGeometry = (mesh) => {

            if (mesh.geometry) {
                mesh.geometry.translate(translateVector.x, translateVector.y, translateVector.z);
                mesh.geometry.computeVertexNormals();
                mesh.geometry.computeBoundsTree();
            }

            if (mesh.material) {
                if (mesh.material instanceof THREE.MeshPhysicalMaterial || mesh.material instanceof THREE.MeshStandardMaterial) {
                    let new_material = new THREE.MeshPhongMaterial()
                    new_material.map = mesh.material.map
                    new_material.color = mesh.material.color

                    mesh.material = new_material
                    mesh.material.envMapIntensity = 0.5;
                }

                mesh.material.side = THREE.DoubleSide;
                mesh.material.transparent = true;
                mesh.material.selectable = true
            }

            for (let child of mesh.children) {
                translateGeometry(child);
            }
        }

        box.setFromObject(model)    //Рассчет BoundingBox геометрии
        box.getCenter(center)       //Получение координат центра BoundingBox

        calculateTranslateVector()
        translateGeometry(model);

        model.unionBoundingBox = unionBoundingBox(model);
        model.updateMatrixWorld(true)

        return translateVector;
    }

    static changeModelScale(model, scale_vector = new THREE.Vector3(1, 1, 1)) {
        const scaleVector = new THREE.Vector3()
        const box = model.unionBoundingBox

        scaleVector.subVectors(box.max, box.min)

        scaleVector.x = scale_vector.x / Math.abs(scaleVector.x)
        scaleVector.y = scale_vector.y / Math.abs(scaleVector.y)
        scaleVector.z = scale_vector.z / Math.abs(scaleVector.z)

        //Изменение размеров модели, для соответствия пришедшим параметрам
        const scaleGeometry = (mesh) => {

            if (mesh.geometry) {
                mesh.geometry.scale(scaleVector.x, scaleVector.y, scaleVector.z)
            }

            for (let child of mesh.children)
                scaleGeometry(child)
        }
        //

        scaleGeometry(model)

        model.unionBoundingBox = unionBoundingBox(model);
        model.updateMatrixWorld(true)
    }

    static loadGLTF() {
        // .glb & .gltf
        return new GLTFLoader();
    }
}

//Получение из url расширения файла
function parseExtension(url){
    return url.split(".").pop()
}

function unionBoundingBox(model) {

    let boundingBox = new THREE.Box3();

    if (model.geometry) {
        model.geometry.computeBoundingBox();
        boundingBox = model.geometry.boundingBox.clone();
        if (boundingBox.min.length() === Infinity || boundingBox.max.length() === Infinity) {
            return null;
        }
    }

    for (let child of model.children) {
        boundingBox.union(unionBoundingBox(child));
    }

    return boundingBox;
}