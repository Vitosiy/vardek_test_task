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
                    let boundingBox = Utils.unionBoundingBox(_object)

                    setObject({
                        item: _object,
                        boundingBox,
                        width: Math.abs(boundingBox.min.x - boundingBox.max.x),
                        height: Math.abs(boundingBox.min.y - boundingBox.max.y),
                        depth: Math.abs(boundingBox.min.z - boundingBox.max.z),
                    })
                })
            }

        }, 1000)
    }

    if(!three_dom_elem)
        check_dom_elem()

    const changeObjectSize = (vector) => {
        let scaleVector =  new THREE.Vector3(object.width, object.height, object.depth).divide(vector)

        object.item.scale.copy(scaleVector)

        let boundingBox = Utils.unionBoundingBox(object.item)

        setObject({
            item: object.item,
            boundingBox,
            width: Math.abs(boundingBox.min.x - boundingBox.max.x),
            height: Math.abs(boundingBox.min.y - boundingBox.max.y),
            depth: Math.abs(boundingBox.min.z - boundingBox.max.z),
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
                                    id="outlined-required"
                                    label="Ширина"
                                    defaultValue={`${object.width * 1000}`}
                                    onChange={(event) => {
                                        changeObjectSize(new THREE.Vector3(+event.target.value / 1000, object.height, object.depth))
                                    }}
                                />
                            </MenuList>
                        </MenuItem>
                        <MenuItem>
                            <MenuList>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Высота"
                                    defaultValue={`${object.height * 1000}`}
                                    onChange={(event) => {
                                        changeObjectSize(new THREE.Vector3(object.width, +event.target.value / 1000, object.depth))
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