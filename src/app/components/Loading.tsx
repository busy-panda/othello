import { useLoadingStatus } from "@/app/hooks/useLoadingStatus";

export default function Loading({children}:any) {

    const isLoading = useLoadingStatus();

    return (
        <div style={{
            backgroundColor: '#111',
            paddingLeft: '4%',
            paddingRight: '4%',
            paddingTop: '2%',
            paddingBottom: '2%',
            color:'#ddd',
            zIndex: 1,
            position: 'absolute',
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 1s',
        }}
        >{children}</div>
    );
}