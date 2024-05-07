
export default function Background  ({ image, children })  {

    return (
        <main
            className="flex flex-col flex-grow h-full items-center justify-center"
            style={{
                background: `url(${image})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}>
            {children}
        </main>
    )
}

