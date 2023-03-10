<?php

namespace App\Http\Controllers;

use OpenAI\Laravel\Facades\OpenAI;
use Str;

class ResetController
{
    public function __invoke()
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

        request()->session()->forget('messages');

        return redirect()->route('home');
    }
}
