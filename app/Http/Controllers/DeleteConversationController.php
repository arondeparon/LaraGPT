<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeleteConversationController extends Controller
{
    public function __invoke(string $id)
    {
        $conversations = collect(request()->session()->get('conversations', []));

        $conversations = $conversations->reject(function ($conversation) use ($id) {
            return $conversation['id'] === $id;
        });

        request()->session()->put('conversations', $conversations);

        return redirect()->route('home');
    }
}
