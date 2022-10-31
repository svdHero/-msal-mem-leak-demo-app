import LoadingMessage from "./LoadingMessage"

type LoadingBoxProps = {
    message: string
}
function LoadingBox(props: LoadingBoxProps) {
    return (
        <div className="box">
            <LoadingMessage {...props}/>
        </div>
    )
}

export default LoadingBox
