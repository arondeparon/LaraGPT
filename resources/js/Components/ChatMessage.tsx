import React from 'react';
import classNames from "classnames";

enum Role {
    Assistant = 'assistant',
    User = 'user',
}

interface Message {
    id: number;
    content: string;
    role: Role;
}

interface ChatMessageProperties {
    message: Message;
}

function ChatMessage({ message, ...rest }: ChatMessageProperties & React.HTMLAttributes<HTMLDivElement>) {
    return <div

        className={classNames("flex p-4 space-x-4", {
            "justify-end": message.role === "assistant",
            "justify-start": message.role === "user",
        })}>
        <div className={classNames("rounded-md p-3", {
            "bg-white": message.role === "assistant",
            "bg-blue-500 text-white": message.role === "user",
            "ring-1 ring-blue-500": message.role === "user",
            "ring-1 ring-gray-300": message.role === "assistant",
        })}>
            {message.content}
        </div>
    </div>;
}

export default ChatMessage;
