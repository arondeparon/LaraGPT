import React from 'react';
import classNames from "classnames";
import {marked} from "marked";

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
            "justify-start": message.role === "assistant",
            "justify-end": message.role === "user",
        })}>
        <div className={classNames("rounded-2xl py-2 px-3 max-w-[65%]", {
            "bg-neutral-200 text-neutral-900": message.role === "assistant",
            "bg-blue-500 text-white": message.role === "user",
        })}>
            <div dangerouslySetInnerHTML={{ __html: marked(message.content) }} />
        </div>
    </div>;
}

export default ChatMessage;
