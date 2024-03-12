import * as THREE from "three";

//Обработчик событий мешей
export default class SelectedControl {

    constructor(params = {}) {
        this.three = params.three || {}
        this.dom = params.dom || document
        this.selected = false;
    }

    clear() {

        if(this.selected) {
            switch (this.selected.objectType) {
                case "sensor":
                    break;
                case "roof_element":
                    break;
                default:
                    break;
            }
        }

        this.selected = false;
    }

    onGrafanaVariableChange(variable) {

    }

    onClick(event) {

    }

    onPointerMove(event) {

    }

    onPointerOver(event) {

    }

    onContextMenu(event) {

    }

    onPointerOut(event) {

    }

    onPointerMissed(event) {
        this.clear()
    }
}