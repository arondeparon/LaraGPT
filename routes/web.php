<?php

use App\Http\Controllers\HandlePromptController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\SelectConversationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', HomeController::class)->name('home');
Route::post('/prompt', HandlePromptController::class)->name('prompt');
Route::get('/conversation/{id}', SelectConversationController::class)->name('select-conversation');
Route::get('/reset', ResetController::class)->name('reset');
