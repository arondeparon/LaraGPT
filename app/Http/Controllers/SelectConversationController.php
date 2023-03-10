<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SelectConversationController extends Controller
{
    public function __invoke(string $id)
    {
        $conversations = collect(request()->session()->get('conversations', []));

        $conversation = $conversations->firstWhere('id', $id);

        if (! $conversation) {
            return redirect()->route('home');
        }

        request()->session()->put('messages', $conversation['messages']);
        request()->session()->put('current_conversation', $id);

        return redirect()->route('home');
    }
}
