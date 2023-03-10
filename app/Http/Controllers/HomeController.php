<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $messages = collect(request()->session()->get('messages'))
            ->reject(function ($message) {
                return $message['role'] === 'system';
            });

        return view('home/index')->with('messages', $messages);
    }
}
