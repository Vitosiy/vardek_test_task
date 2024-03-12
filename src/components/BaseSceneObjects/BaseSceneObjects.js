import SkyBox from "./modules/SkyBox";
import FloorMap from "./modules/FloorMap";
import Light from "./modules/Light";

/**
 *Компонент, создающий основное оформление сцены.
 */

export default function BaseSceneObjects() {
    return (
        <>
            <Light/>
            <SkyBox/>
            <FloorMap/>
        </>
    );
}
