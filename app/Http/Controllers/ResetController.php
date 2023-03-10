<?php

namespace App\Http\Controllers;

class ResetController
{
    public function __invoke()
    {
        request()->session()->forget('messages');

        return redirect()->route('home');
    }
}
