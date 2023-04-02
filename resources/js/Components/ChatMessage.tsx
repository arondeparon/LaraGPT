import React, { useEffect } from 'react';
import classNames from "classnames";
import {marked} from "marked";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
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

marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function(code) {
        return hljs.highlightAuto(code, ["html", "javascript","php","go","python","c#","c","c++","typescript"]).value;
    }
});

function ChatMessage({ message, ...rest }: ChatMessageProperties & React.HTMLAttributes<HTMLDivElement>) {
    return <div

        className={classNames("flex p-4 space-x-4", {
            "justify-start": message.role === "assistant",
            "justify-end": message.role === "user",
        })}>
        <div className={classNames("rounded-2xl py-2 px-3 max-w-[65%] ", {
            "bg-neutral-200 text-neutral-900": message.role === "assistant",
            "bg-blue-500 text-white": message.role === "user",
        })}
        >
            <div dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }} />
        </div>
    </div>;
}

export default ChatMessage;
