import React from 'react';
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

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            <div className="border rounded-md p-2 flex-1 relative">
                <textarea id="message" name="message"
                          className="w-full resize-none focus:outline-none pr-20 text-gray-800"
                          value={data.message}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                ></textarea>
                <button className="absolute right-5 top-4 bg-blue-600 text-white p-2 rounded-md disabled:bg-gray-200 disabled:text-gray-500" disabled={processing || data.message === ''}
                        onClick={handleClickSubmit}
                >
                    { processing ? 'Processing...' : 'Send' }
                </button>
            </div>
        </form>
    );
}

export default MessageBox;
