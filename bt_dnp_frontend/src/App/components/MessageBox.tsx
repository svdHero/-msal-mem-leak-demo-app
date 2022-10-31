import React from "react"
import Message, {MessageProps} from "./Message"

export type MessageBoxProps = MessageProps

function MessageBox(props: MessageBoxProps) {
    return (
        <div className="box">
            <Message {...props}/>
        </div>
    )
}

export default MessageBox
