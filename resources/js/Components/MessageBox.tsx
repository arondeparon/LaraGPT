import React, {useState} from 'react';
import useRoute from "@/Hooks/useRoute";
import {useForm} from "@inertiajs/react";

interface MessageBoxProperties {
    onSubmit?: (message: string) => void;
}
function MessageBox({ onSubmit }: MessageBoxProperties) {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        message: '',
    })

    const [rows, setRows] = useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        console.log(currentRows);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= 5) {
            event.target.rows = 5;
            event.target.scrollTop = event.target.scrollHeight;
        }

        setRows(currentRows);

        setData('message', event.target.value)
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            // Bit hacky, but hey.
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.message === '') {
            return;
        }
        post(route('prompt'));

        if (onSubmit) {
            onSubmit(data.message);
        }
        // clear the message box
        setData('message', '');
    };

    const handleClickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }

    return (
        <form className="p-4 flex space-x-4 justify-center items-center" action={route('prompt')}
              id="prompt-form"
              method="post">
            <label htmlFor="message" className="hidden">Prompt:</label>
            <div className="border border-gray-600 rounded-md p-2 flex-1 relative">
                <textarea id="message" name="message"
                          className="w-full resize-none focus:outline-none pl-1 pr-12 text-gray-600"
                          value={data.message}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          rows={rows}
                          placeholder="Type your message here..."
                ></textarea>
                <button className="absolute right-0 bottom-[6px] text-white p-2 disabled:text-gray-300 text-gray-600 hover:text-blue-600" disabled={processing || data.message === ''}
                        onClick={handleClickSubmit}
                >
                    { processing ? (
                        <div className="animate-spin">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </div>
                            ) : (
                        <div className="-rotate-45">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </div>
                    ) }
                </button>
            </div>
        </form>
    );
}

export default MessageBox;
