import React from "react"

function isUndefinedOrNullOrWhitespace(str: string|undefined|null): boolean {
    return (!str || str.trim().length===0);
}

type LoadingMessageProps = {
    message?: string
}
function LoadingMessage(props: LoadingMessageProps) {
    if(isUndefinedOrNullOrWhitespace(props.message))
        return (
            <div className="container">
                <div className="columns is-centered is-vcentered is-mobile">
                    <div className="column has-text-centered">
                        <i className="fas fa-spinner fa-pulse"/>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-three-fifths">
                        <article className="message is-primary">
                            <div className="message-header">
                                <p>{props.message}</p>
                            </div>
                            <div className="message-body">
                                <progress className="progress is-medium is-primary"/>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
}

export default LoadingMessage
