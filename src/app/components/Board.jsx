import Cell from "./Cell";

export default function  Board  ()  {

    const rows = [];

    for (let y = 0; y < 8; y++) {

        const cols = [];
        for (let x = 0; x < 8; x++) {
            const key = `C${x}${y}`
            cols.push(<Cell  key={key} x={x} y={y}  />);
        }
        const rowkey = `R${y}`
        rows.push(
            <div key={rowkey} className="flex-grow">
                <div className="flex flex-row h-full">
                    {cols}
                </div>
            </div>
        );
    }
    return (

        <div className="h-full w-full flex flex-col">
            {rows}
        </div>
        
    )

}
