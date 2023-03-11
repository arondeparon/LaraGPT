import React, {useEffect, useRef, useState} from "react";
import Sidebar from "@/Components/Sidebar";
import ChatMessage from "@/Components/ChatMessage";
import MessageBox from "@/Components/MessageBox";
import {Head, router} from "@inertiajs/react";
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

interface HomeProperties {
    currentConversation?: string;
    messages: Message[];
    conversations: Array<{
        id: string;
        summary: string;
        messages: Message[];
    }>;
    loading: boolean;
}



const Home = ({currentConversation, messages, conversations}: HomeProperties) => {
    const [loading, setLoading] = useState(false);
    const [messageStack, setMessageStack] = useState<Message[]>(messages);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);

    };

    useEffect(() => {
        setMessageStack(messages);
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [loading]);

    useEffect(() => {
        router.on('finish', () => {
            setLoading(false);
        });
    }, []);

    const handleSubmit = (message: string) => {
        // add a dummy message to the stack
        setMessageStack([...messageStack, {
            id: messageStack.length + 1,
            content: message,
            role: Role.User,
        }]);
        setLoading(true);
    };

    return (
        <>
            <Head title="Home"></Head>
            <div className="flex">
                <div className="w-1/5 h-screen bg-gray-800 text-white overflow-y-scroll">
                    <Sidebar conversations={conversations} currentConversation={currentConversation} />
                </div>
                <div className="w-4/5 h-screen relative overflow-y-scroll">
                    <div className="flex flex-col h-full w-full relative">
                        <div className="flex-grow bg-white">
                            {messageStack ? messageStack.map((message, index) => (
                                <div>
                                    <ChatMessage key={message.id} message={message} />
                                </div>
                            )) : null}
                            { loading ? (
                                <ChatMessage message={{
                                    id: messageStack.length + 1,
                                    content: '...',
                                    role: Role.Assistant,
                                } as Message} />
                            ) : null}
                            <div ref={messagesEndRef} className="h-0" />
                        </div>
                        <div className="h-75 left-0 right-0 bottom-0 sticky bg-white">
                            <MessageBox onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
