@extends('layouts.app')

@section('content')
    <div class="flex">
        <div class="w-1/5 h-screen bg-gray-800 text-white overflow-y-scroll">
            <div class="h-4/5">
                <a href="{{ route('reset') }}"
                   class="flex space-x-8 border border-white rounded m-2 p-4 items-center hover:bg-gray-700">
                    <!-- svg "plus" icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <div>New chat</div>
                </a>
                <ul class="flex flex-col m-2 space-y-2">
                    @if (! isset ($currentConversation))
                        <li class="flex space-x-4 items-center bg-gray-700 rounded">
                            <div class="block p-4 truncate overflow-hidden w-80">[ Ongoing conversation ]</div>
                        </li>
                    @endif
                    @foreach ($conversations as $conversation)
                        <li class="flex space-x-4 items-center group hover:bg-gray-700 rounded">
                            <a href="/conversation/{{ $conversation['id'] }}"
                               title="{{ $conversation['summary'] }} }}"
                               class="block p-4 truncate overflow-hidden w-80"
                            >{{ $conversation['summary'] }}</a>
                            <a href="{{ route('delete-conversation', $conversation['id']) }}" class="hidden group-hover:block pr-4 hover:text-gray-200">
                                <!-- trash icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </a>
                        </li>
                    @endforeach
                </ul>

            </div>
            <div>

            </div>
        </div>
        <div class="w-4/5 h-screen relative">
            <div class="flex flex-col h-full w-full relative">
                <div class="flex-grow bg-gray-200" id="messages-wrapper">
                    @foreach ($messages as $message)
                        <div
                            @class([
                                'flex p-4 space-x-4',
                                'justify-end' => $message['role'] === 'assistant',
                                'justify-start' => $message['role'] === 'user',
                                'bg-gray-100' => $loop->index % 2 === 0,
                            ])
                        >
                            <div @class([
                                'rounded-md p-3',
                                'bg-white' => $message['role'] === 'assistant',
                                'bg-blue-500 text-white' => $message['role'] === 'user',
                                'ring-1 ring-blue-500' => $message['role'] === 'user',
                                'ring-1 ring-gray-300' => $message['role'] === 'assistant',
                            ])>
                                {!! \Illuminate\Mail\Markdown::parse($message['content']) !!}
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="h-75 left-0 right-0 bottom-0 sticky bg-white">
                    <form class="p-4 flex space-x-4 justify-center items-center" action="{{ route('prompt') }}"
                          id="prompt-form"
                          method="post">
                        @csrf
                        <label for="message" class="hidden">Prompt:</label>
                        <textarea id="message" type="text" name="message" autocomplete="off"
                                  class="border rounded-md  p-2 flex-1"></textarea>
                        <button type="submit" class="bg-blue-600 text-white p-2 rounded-md">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        const messageElement = document.getElementById('message');
        messageElement.focus();
        messageElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && ! event.shiftKey) {
                const numberOfLines = messageElement.value.split(/\r*\n/).length;
                if (numberOfLines >= 1 && messageElement.value.trim().length > 0) {
                    event.preventDefault();
                    document.getElementById('prompt-form').submit();
                }
            }
        });
    </script>
@endsection
