
import { useContext } from "react";
import { GameContext } from "@/providers/GameContext";
import { GameDispatchContext } from "@/providers/GameContext";
import { getColor } from "@/providers/gameReducer";
import { Color } from "@/providers/gameReducer";

export default function  Cell  ({ x , y})  {

    const game = useContext(GameContext)
    const dispatchGame = useContext(GameDispatchContext)

    const onCellClick = () => {

        dispatchGame( {
            type:'play', 
            pos: currentPosition}
        )
    }

    const currentPosition = { 
        x: x,
        y: y
    };
    
    const getImage = () => {
        const color = getColor(game.board, currentPosition);
        if (color === Color.WHITE) {
            return "url('white.png')"
        } else if (color === Color.BLACK) {
            return "url('black.png')"
        } else {
            return '';
        }
    } 

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
    )

}
