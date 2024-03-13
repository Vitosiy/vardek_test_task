import {useWindowSize} from "./components/hooks/useWindowSize";
import UI from "./components/UI/UI";
import Three from "./components/Three";

export default function App(props) {
    const [width, height] = useWindowSize()

    return (
        <main id="ThreePlugin" style={{height, width}}>
            <UI/>
            <Three/>
        </main>
    )
}
