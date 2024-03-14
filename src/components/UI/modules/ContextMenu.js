import {useState} from "react";
import * as THREE from "three";

import useContextMenu from "../../hooks/useContextMenu";
import {MenuItem, MenuList, Paper, TextField} from "@mui/material";
import Utils from "../../utils/Utils";

export default function ContextMenu() {
    const {clicked, setClicked, points, setPoints} = useContextMenu();
    const [object, setObject] = useState(false);

    let three_dom_elem = document.querySelector('CANVAS') || false;

    let check_dom_elem = () => {
        setTimeout(() => {
            three_dom_elem = document.querySelector('CANVAS')

            if(!three_dom_elem)
                check_dom_elem()
            else {
                three_dom_elem.addEventListener("create_menu", (event) => {

                    setClicked(true)

                    const points = event.detail.points
                    setPoints({
                        x: points[0],
                        y: points[1],
                    });

                    let _object = event.detail.object
                    let boundingBox = _object.unionBoundingBox
                    let size_preview_mesh = boundingBox.getSize(new THREE.Vector3());

                    setObject({
                        item: _object,
                        boundingBox,
                        size_preview_mesh,
                        width: size_preview_mesh.x,
                        height: size_preview_mesh.y,
                        depth: size_preview_mesh.z,
                    })
                })
            }

        }, 1000)
    }

    if(!three_dom_elem)
        check_dom_elem()

    const setInputValue = (id, value) => {

        let elem = document.getElementById(id);
        if (elem) {
            elem.value = value;
        }

    };

    const changeObjectSize = (axis, value) => {
        if (!value) {
            return;
        }

        let boundingBox = Utils.unionBoundingBox(object.item);
        let size_preview_mesh = boundingBox.getSize(new THREE.Vector3());

        let scale_value = Math.abs((value * 0.001) / size_preview_mesh[axis]);

        const scale_param = {
            x: 1, y: 1, z: 1,
        };

        scale_param.x = scale_value;
        scale_param.y = scale_value;
        scale_param.z = scale_value;

        if (axis !== "x") {
            setInputValue(`sizeX`, Math.round(size_preview_mesh.x * scale_value * 1000));
        }
        if (axis !== "y") {
            setInputValue(`sizeY`, Math.round(size_preview_mesh.y * scale_value * 1000));
        }

        const setScale = (model) => {

            if (model.geometry) {
                model.geometry.scale(scale_param.x, scale_param.y, scale_param.z);
                model.geometry.computeVertexNormals();
            }

            for (let child of model.children) {
                setScale(child);
            }

        };

        setScale(object.item);

        boundingBox = Utils.unionBoundingBox(object.item);
        size_preview_mesh = boundingBox.getSize(new THREE.Vector3());
        object.item.unionBoundingBox = boundingBox

        setObject({
            item: object.item,
            boundingBox,
            size_preview_mesh,
            width: size_preview_mesh.x,
            height: size_preview_mesh.y,
            depth: size_preview_mesh.z,
        })
    }

    return (
        <div id="ContextMenu">
            {clicked && (
                <Paper
                    sx={{
                    position: "absolute",
                    width: "300px",
                    "background-color": "#555555",
                    color: "#ffffff",
                    "border-radius": "5px",
                    "box-sizing": "border-box",
                    top: points.y,
                    left: points.x,
                    }}
                >
                    <MenuList>
                        <MenuItem>
                            <MenuList>
                                <TextField
                                    required
                                    id="sizeX"
                                    label="Ширина"
                                    defaultValue={`${Math.round(object.width * 1000)}`}
                                    onChange={(event) => {
                                        changeObjectSize("x", +event.target.value)
                                    }}
                                />
                            </MenuList>
                        </MenuItem>
                        <MenuItem>
                            <MenuList>
                                <TextField
                                    required
                                    id="sizeY"
                                    label="Высота"
                                    defaultValue={`${Math.round(object.height * 1000)}`}
                                    onChange={(event) => {
                                        changeObjectSize("y", +event.target.value)
                                    }}
                                />
                            </MenuList>
                        </MenuItem>
                    </MenuList>
                </Paper>
            )}
        </div>
    );
}