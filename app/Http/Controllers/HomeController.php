<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Ramsey\Uuid\Lazy\LazyUuidFromString;

class HomeController extends Controller
{
    public function __invoke()
    {
        $conversations = collect(request()->session()->get('conversations', []))->reverse()->values();

        $messages = collect(request()->session()->get('messages'))
            ->reject(function ($message) {
                return $message['role'] === 'system';
            })->values();


        return Inertia::render('Home/Index')
            ->with('currentConversation', request()->session()->get('current_conversation'))
            ->with('messages', $messages)
            ->with('conversations', $conversations);
    }
}
