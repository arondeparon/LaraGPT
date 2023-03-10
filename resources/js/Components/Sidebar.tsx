import React from 'react';
import useRoute from "@/Hooks/useRoute";

interface SidebarProperties {
    currentConversation?: string;
    conversations: Array<{
        id: string;
        summary: string;
    }>;
}

const Sidebar = ({ currentConversation, conversations }: SidebarProperties) => {
    const route = useRoute();
    return (
        <>
        <div className="h-4/5">
            <a href={route('reset')}
               className="flex space-x-8 border border-white rounded m-2 p-4 items-center hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <div>New chat</div>
            </a>
            <ul className="flex flex-col m-2 space-y-2">
                {currentConversation ? (
                    <li className="flex space-x-4 items-center bg-gray-700 rounded">
                        <div className="block p-4 truncate overflow-hidden w-80">[ Ongoing conversation ]</div>
                    </li>
                ) : null}
                {conversations.map(conversation => (
                    <li className="flex space-x-4 items-center group hover:bg-gray-700 rounded"
                        key={conversation.id}>
                        <a href={`/conversation/${conversation.id}`}
                           title={conversation.summary}
                           className="block p-4 truncate overflow-hidden w-80"
                        >{conversation.summary}</a>
                        <a href={route('delete-conversation', conversation.id)}
                           className="hidden group-hover:block pr-4 hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        <div>

        </div>
    </>
    )
};

export default Sidebar;
