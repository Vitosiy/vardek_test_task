import EventController from "./modules/EventControls/EventController";
import {MyOrbitControlsComponent} from "./modules/MyOrbitControls/MyOrbitControlsComponent";

/**
 *Компонент, возвращающий на сцену все контроллеры.
 */

export default function Controllers() {
    return (
        <>
            <EventController/>
            <MyOrbitControlsComponent
                maxDistance={500}
                enableDamping={false}
            />
        </>
    );
}
