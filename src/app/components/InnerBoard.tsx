
export default function  InnerBoard  ({ children } : any) {

    return (
        <div
            style={
                {
                    position: 'relative',
                    height: "64%",
                    width: "89%",
                    top: "18%",
                    left: "5.45%"
                }
            }>
            {children}
        </div>
    );

}
