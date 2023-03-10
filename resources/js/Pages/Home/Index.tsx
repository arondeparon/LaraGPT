import React, {useEffect, useRef, useState} from "react";
import Sidebar from "@/Components/Sidebar";
import ChatMessage from "@/Components/ChatMessage";
import MessageBox from "@/Components/MessageBox";
import {router} from "@inertiajs/react";

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

    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessageStack(messages);
        setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 100);
    }, [messages]);

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
        setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    return (
        <div className="flex">
            <div className="w-1/5 h-screen bg-gray-800 text-white overflow-y-scroll">
                <Sidebar conversations={conversations} currentConversation={currentConversation} />
            </div>
            <div className="w-4/5 h-screen relative overflow-y-scroll" ref={messageContainerRef}>
                <div className="flex flex-col h-full w-full relative">
                    <div className="flex-grow bg-gray-200">
                        {messageStack ? messageStack.map((message, index) => (
                            <ChatMessage key={message.id} message={message} />
                        )) : null}
                        { loading ? (
                            <div className="flex justify-center items-center h-20">
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0a8 8 0 018 8H9a7 7 0 00-7-7v1zm0 0a8 8 0 018 8v-1a7 7 0 00-7-7h1zm0 0a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                                </svg>
                                <div>Loading...</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="h-75 left-0 right-0 bottom-0 sticky bg-white">
                        <MessageBox onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
