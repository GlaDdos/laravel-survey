<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::get('/me', [\App\Http\Controllers\AuthController::class, 'me']);
    Route::apiResource('survey', \App\Http\Controllers\SurveyController::class);

    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);

});

Route::post('/signup', [\App\Http\Controllers\AuthController::class, 'signup']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::get('/survey/get-by-slug/{survey:slug}', [\App\Http\Controllers\SurveyController::class, 'getBySlug']);
Route::post('/survey/{survey}/answer', [\App\Http\Controllers\SurveyController::class, 'storeAnswer']);
