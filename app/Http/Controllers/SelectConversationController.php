<?php

namespace App\Http\Controllers;

use App\Actions\CreateConversationSummaryAction;
use Illuminate\Http\Request;

class SelectConversationController extends Controller
{
    public function __invoke(string $id, CreateConversationSummaryAction $createConversationSummaryAction)
    {
        $conversations = collect(request()->session()->get('conversations', []));

        $conversation = $conversations->firstWhere('id', $id);

        if (! $conversation) {
            return redirect()->route('home');
        }

        if (! request()->session()->has('current_conversation')) {
            $createConversationSummaryAction->execute();
        }

        request()->session()->put('messages', $conversation['messages']);
        request()->session()->put('current_conversation', $id);

        return redirect()->route('home');
    }
}
