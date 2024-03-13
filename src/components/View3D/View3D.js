import CubeModel from "./modules/CubeModel";
import TorusKnotModel from "./modules/TorusKnotModel";

/**
 * Добавляет на сцену необходимы 3D модели
 */
export default function View3D(){
    return(
        <>
            <CubeModel/>
            <TorusKnotModel/>
        </>
    )
}