import React from "react";

/**
 *Основной компонент света на 3D сцене.
 */

export default function Light() {
    return (
        <>
            <hemisphereLight
                intensity={0.3}
            />
            <directionalLight
                intensity={0.8}
                position={[-50, 80, -50]}
                castShadow={true}
            />
        </>
    );
}
