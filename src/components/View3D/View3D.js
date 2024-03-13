import CubeModel from "./modules/CubeModel";
import TorusKnotModel from "./modules/TorusKnotModel";
//import DoorModel from "./modules/DoorModel";
import DoorThreeModel from "./modules/DoorThreeModel";

/**
 * Добавляет на сцену необходимы 3D модели
 */
export default function View3D(){
    return(
        <>
            <CubeModel/>
            <TorusKnotModel/>
            <DoorThreeModel/>
        </>
    )
}