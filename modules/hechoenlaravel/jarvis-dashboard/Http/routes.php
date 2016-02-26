<?php

Route::group(['prefix' => 'dashboard', 'namespace' => 'Modules\Dashboard\Http\Controllers', 'middleware' => ['auth']], function()
{
	Route::get('/demo', ['as' => 'dashboard.demo', 'uses' => 'DashboardController@index']);
});