import {MyOrbitControlsComponent} from "./modules/MyOrbitControls/MyOrbitControlsComponent";

/**
 *Компонент, возвращающий на сцену все контроллеры.
 */

export default function Controllers() {
    return (
        <>
            <MyOrbitControlsComponent
                maxDistance={500}
                enableDamping={false}
            />
        </>
    );
}
