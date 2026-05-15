<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TestApiService
{
    public function testBasicAuth()
    {
        $response = Http::withBasicAuth(
            'admin',
            'password'
        )->get(
            'https://httpbin.org/basic-auth/admin/password'
        );

        if ($response->failed()) {
            return [
                'success' => false,
                'status' => $response->status(),
            ];
        }

        return $response->json();
    }
}
