<?php

namespace App\Http\Controllers;

use App\Actions\CreateConversationSummaryAction;
use OpenAI\Laravel\Facades\OpenAI;
use Str;

class ResetController
{
    public function __invoke(CreateConversationSummaryAction $createConversationSummaryAction)
    {
        if (! request()->session()->has('current_conversation')) {
            $createConversationSummaryAction->execute();
        }

        request()->session()->forget('messages');
        request()->session()->forget('current_conversation');

        return redirect()->route('home');
    }
}
