<?php

namespace App\Http\Controllers;

use App\Actions\CreateConversationSummaryAction;
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
                'content' => 'Sen Laravel ile yapılmış bir chat botusun ve adın SerhatGPT. Sana sorulan ilk soruda mutlaka kendini tanıtarak cevap vermelisin.'
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
        if (!request()->session()->has('current_conversation')) {
            $conversation = new CreateConversationSummaryAction();
            $conversation->execute();
            $request->session()->put('current_conversation', true);
        }

        return redirect()->route('home');
    }
}
