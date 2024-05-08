import { useContext, useEffect } from "react";
import { useState } from "react";
import { Color } from "../objects/Color";
import { GameContext } from "@/app/context/GameContext";

export default function WhoIsPlaying ()  {

    const DELAY = 1000;

    const [labelVisible, setLabelVisible] = useState(false);
    const game = useContext(GameContext);
    const playing = game.playing === Color.WHITE ? 'WHITE' : 'BLACK';

    useEffect(() => {
        setTimeout(() => setLabelVisible(true), DELAY);
    }, []);

    return (
        <div
            style={{
                position:"absolute",
                right:0,
                bottom:0,
                display: labelVisible ?'':'none',
                backgroundColor: '#111',
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '1%',
                paddingBottom: '1%',
                color:'#ddd'
            }}

        >Playing: {playing}</div>
    );
}