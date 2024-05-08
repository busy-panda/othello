export default function Button({text, onClick, style}: any) {

    return (
        <button
            style={{
                ...style,
                backgroundColor: '#111',
                borderRadius: '0.3rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                fontSize: '0.8rem',
                margin: '0.5rem',
                color: '#ddd',

            }}
            onClick={onClick}
        >{text}</button>
    );
}