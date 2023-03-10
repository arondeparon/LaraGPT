@extends('layouts.app')

@section('content')
    <div class="flex">
        <div class="w-1/5 h-screen bg-gray-800 text-white">
            <a href="{{ route('reset') }}"
               class="flex space-x-8 border border-white rounded m-2 p-4 items-center hover:bg-gray-700">
                <!-- svg "plus" icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <div>New chat</div>
            </a>
            @if ($conversations)
                <ul class="flex flex-col m-2">
                    @foreach ($conversations as $conversation)
                        <li>
                            <a href="/conversation/{{ $conversation['id'] }}"
                               title="{{ $conversation['summary'] }} }}"
                               class="block p-4 rounded hover:bg-gray-700 truncate overflow-hidden w-80"
                            >{{ $conversation['summary'] }}</a>
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>
        <div class="w-4/5 h-screen relative">
            <div class="flex flex-col h-full w-full relative">
                <div class="flex-grow bg-gray-200" id="messages-wrapper">
                    @foreach ($messages as $message)
                        <div
                            class="flex justify-{{ $message['role'] === 'assistant' ? 'end' : 'start' }} p-4 space-x-4">
                            <div class="bg-white rounded-md p-2">
                                @if ($message['role'] === 'assistant')
                                    <div class="text-xs text-gray-500">{{ $message['role'] }}</div>
                                @else
                                    <div class="text-xs text-blue-400 font-bold">You</div>
                                @endif
                            </div>
                            <div class="bg-white rounded-md p-2">
                                {!! \Illuminate\Mail\Markdown::parse($message['content']) !!}
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="h-75 left-0 right-0 bottom-0 sticky bg-white">
                    <form class="p-4 flex space-x-4 justify-center items-center" action="{{ route('prompt') }}"
                          method="post">
                        @csrf
                        <label for="message" class="hidden">Prompt:</label>
                        <textarea id="message" type="text" name="message" autocomplete="off"
                                  class="border rounded-md  p-2 flex-1"></textarea>
                        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Send</button>
                        <a class="bg-gray-800 text-white p-2 rounded-md" href="{{ route('reset') }}">Reset
                            Conversation</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
