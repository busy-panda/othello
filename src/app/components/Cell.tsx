
import { useContext } from "react";
import { GameContext } from "@/app/context/GameContext";
import { GameDispatchContext } from "../context/GameDispatchContext";
import { GameDispatchAction } from "../context/GameDispatchContext";
import { Color } from "@/app/objects/Color";
import { Position } from "../objects/Position";
import { Game } from "../objects/Game";
import { Dispatch } from "react";

export default function  Cell  ({ x  , y} : any)  {

    const game : Game = useContext(GameContext);
    const dispatchGame : Dispatch<GameDispatchAction> = useContext(GameDispatchContext);

    const onCellClick = () => {

        dispatchGame( {
            type:'play',
            pos: currentPosition}
        );
    };

    const currentPosition = Position.of(x,y);

    const getImage = () => {
        const color = game.getColor(currentPosition);
        if (color === Color.WHITE) {
            return "url('white.png')";
        } else if (color === Color.BLACK) {
            return "url('black.png')";
        } else {
            return '';
        }
    };

    return (
        <div className="flex-grow"
            style={{
                backgroundImage: getImage(),
                backgroundSize: 'cover',
                cursor: 'pointer',
                margin: '1%'
            }}
             onClick={onCellClick}>
        </div>
    );

}
