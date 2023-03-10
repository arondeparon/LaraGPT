<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use Illuminate\Http\Request;
use OpenAI;

class HandlePromptController extends Controller
{
    public function __invoke(PromptRequest $request)
    {
        $messages = $request->session()->get('messages', [
            [
                'role' => 'system',
                'content' => 'You are Laravel-ChatGPT - A ChatGPT clone built with Laravel. Answer as concisely as possible.'
            ],
        ]);

        $messages[] = ['role' => 'user', 'content' => $request->input('message')];

        $response = OpenAI\Laravel\Facades\OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
        ]);

        $answer = $response->choices[0]->message->content;

        $messages[] = [
            'role' => 'assistant',
            'content' => $answer,
        ];

        $request->session()->put('messages', $messages);

        return redirect()->route('home');
    }
}
