import { useState } from "react";
import { useEffect } from "react";
import { useLoadingStatus } from "@/providers/useLoadingStatus";

export default function  OuterBoard  ({ image, children }: any)  {

    const [isLandscape, setIsLandscape] = useState(false);
    const isLoading = useLoadingStatus();

    const orientationchange = () => {
        setIsLandscape(screen.availWidth > screen.availHeight);
    }

    useEffect(() => {

        setIsLandscape(screen.availWidth > screen.availHeight);
        window.addEventListener("orientationchange", orientationchange);
        return () => {
            window.removeEventListener("orientationchange", orientationchange);
        }
    }, []);

    return (
        <div id="table"
            style={
                {
                    height: isLandscape ? '95vh' : '136.5vw'  ,
                    width:  isLandscape ? '68.2vh' : '98vw',
                    background: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    transition: 'opacity 1s',
                    zIndex: 2
                }
            }>
            {children}
        </div>
    )

}
