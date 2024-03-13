import ContextMenu from "./modules/ContextMenu";

export default function UI() {
    return (
        <div className="ui" style={{
            zIndex: 2,
            position: "absolute"
        }}>
            <ContextMenu/>
        </div>
    );
}