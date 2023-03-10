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
        post(route('prompt'));
        if (onSubmit) {
            onSubmit(data.message);
        }
        // clear the message box
        setData('message', '');
    };

    return (
        <form className="p-4 flex space-x-4 justify-center items-center" action={route('prompt')}
              id="prompt-form"
              method="post">
            <label htmlFor="message" className="hidden">Prompt:</label>
            <textarea id="message" name="message"
                      value={data.message}
                      className="border rounded-md  p-2 flex-1"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md" disabled={processing}>
                { processing ? 'Processing...' : 'Send' }
            </button>
        </form>
    );
}

export default MessageBox;
