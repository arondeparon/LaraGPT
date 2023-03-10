@extends('layouts.app')

@section('content')
    <div class="flex flex-col h-full">
        <div class="flex-grow bg-gray-200 pb-[100px]" id="messages-wrapper">
            @foreach ($messages as $message)
            <div class="flex justify-{{ $message['role'] === 'assistant' ? 'end' : 'start' }} p-4 space-x-4">
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
        <div class="h-75 w-full bottom-0 fixed bg-white">
            <form class="p-4 flex space-x-4 justify-center items-center" action="{{ route('prompt') }}" method="post">
                @csrf
                <label for="message" class="hidden">Prompt:</label>
                <textarea id="message" type="text" name="message" autocomplete="off" class="border rounded-md  p-2 flex-1"></textarea>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Send</button>
                <a class="bg-gray-800 text-white p-2 rounded-md" href="{{ route('reset') }}">Reset Conversation</a>
            </form>
        </div>
    </div>
@endsection
