<?php

namespace App\Actions;

use Illuminate\Support\Str;
use OpenAI\Laravel\Facades\OpenAI;

class CreateConversationSummaryAction
{
    public function execute()
    {
        $messages = request()->session()->get('messages');

        $messages[] = [
            'role' => 'user',
            'content' => 'Provide me with a short summary of our conversation, using max 5 words.'
        ];

        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
        ]);

        // remove our last message
        array_pop($messages);

        $answer = $response->choices[0]->message->content;

        $conversations = request()->session()->get('conversations', []);
        $conversations[] = [
            'id' => Str::uuid()->toString(),
            'summary' => $answer,
            'messages' => $messages,
        ];

        request()->session()->put('conversations', $conversations);
    }
}
