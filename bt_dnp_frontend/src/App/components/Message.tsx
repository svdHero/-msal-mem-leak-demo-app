import React from "react"

export enum MessageLevel {
    INFO,
    WARNING,
    DANGER
}

export type MessageProps = {
    title: string
    message: string
    level: MessageLevel
}

function Message(props: MessageProps) {
    let messageCssClass : string = "is-info"
    switch (props.level) {
        case MessageLevel.INFO:
            messageCssClass = "is-info"
            break;
        case MessageLevel.WARNING:
            messageCssClass = "is-warning"
            break;
        case MessageLevel.DANGER:
            messageCssClass = "is-danger"
            break;
        default:
            break;
    }
    // ####################
    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-three-quarters">
                    <article className={`message ${messageCssClass}`}>
                        <div className="message-header">
                            <p>{props.title}</p>
                        </div>
                        <div className="message-body">
                            <p>{props.message}</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default Message
