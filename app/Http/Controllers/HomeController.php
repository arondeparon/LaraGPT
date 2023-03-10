<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Lazy\LazyUuidFromString;

class HomeController extends Controller
{
    public function __invoke()
    {
        $conversations = collect(request()->session()->get('conversations', []))->reverse();

        $messages = collect(request()->session()->get('messages'))
            ->reject(function ($message) {
                return $message['role'] === 'system';
            });

        return view('home/index')
            ->with('currentConversation', request()->session()->get('current_conversation'))
            ->with('messages', $messages)
            ->with('conversations', $conversations);
    }
}
