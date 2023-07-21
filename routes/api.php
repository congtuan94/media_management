<?php

use App\Http\Controllers\FolderController;
use App\Http\Controllers\ImageController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//folders
Route::prefix('folder')->group(function () {
    Route::get('/', [FolderController::class, 'index']);
    Route::post('/add', [FolderController::class, 'store']);
    Route::put('/{id}', [FolderController::class, 'update']);
    Route::delete('/{id}', [FolderController::class, 'destroy']);

    Route::get('/{id}/images', [ImageController::class, 'index']);
    // Route::post('{id}/images/add', [ImageController::class, 'store']);
    // Route::put('/{id}/images/{imageId}', [ImageController::class, 'update']);
    // Route::delete('/{id}/images/{imageId}', [ImageController::class, 'destroy']);

    // Route::get('/images/{imageName}', [ImageController::class, 'show']);
    // Route::get('/{id}', [FolderController::class, 'edit']);
    // Route::get('/add', [FolderController::class, 'create']);
});

//images
Route::prefix('image')->group(function () {
    // Route::get('/', [ImageController::class, 'index']);
    // // Route::get('/add', [ImageController::class, 'create']);
    Route::post('/add', [ImageController::class, 'store']);
    // Route::get('/{id}', [ImageController::class, 'edit']);
    Route::put('/{id}', [ImageController::class, 'update']);
    Route::delete('/{id}', [ImageController::class, 'destroy']);
});
