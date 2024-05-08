import { useContext, useEffect } from "react";
import { GameDispatchContext } from "../context/GameDispatchContext";
import Button from "./Button";
import { useState } from "react";
export default function ResetButton ()  {

    const DELAY = 1000;
    const dispatchGame = useContext(GameDispatchContext);
    const [buttonVisible, setButtonVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setButtonVisible(true), DELAY);
    }, []);

    return (
        <Button
            style={{
                position:"absolute",
                right:0,
                top:0,
                display: buttonVisible ?'':'none'
            }}
            onClick={() => dispatchGame( {type:'reset'}  )}
            text="RESET"
        />
    );
}