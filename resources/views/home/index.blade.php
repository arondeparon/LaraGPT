@extends('layouts.app')

@section('content')
    <div class="flex flex-col h-screen">
        <div class="flex-grow bg-gray-200">
            chat context should go here
        </div>
        <div class="h-75">
            <form class="p-4 flex space-x-4 justify-center items-center" action="/" method="post">
                @csrf
                <input id="message" type="text" name="message" autocomplete="off" class="border rounded-md  p-2 flex-1" />
                <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Send</button>
                <a class="bg-gray-800 text-white p-2 rounded-md" href="/reset">Reset Conversation</a>
            </form>
        </div>
    </div>
@endsection
