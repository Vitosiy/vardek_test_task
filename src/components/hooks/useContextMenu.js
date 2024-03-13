import { useState, useEffect } from "react";

//Хук для контекстного меню по клику ПКМ
const useContextMenu = () => {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    function handleClick(event){
        if(event.target.nodeName === "CANVAS")
            setClicked(false);
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return {
        clicked,
        setClicked,
        points,
        setPoints,
    };
};
export default useContextMenu;