<?php

namespace Tests\Feature;

use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MessageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_send_contact_message(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
            'subject' => 'Test Message',
            'message' => 'This is a test message from contact form',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('message', 'Pesan berhasil dikirim');

        $this->assertDatabaseHas('messages', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Message',
        ]);
    }

    public function test_validation_fails_for_required_fields(): void
    {
        $response = $this->postJson('/api/messages', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'subject', 'message']);
    }

    public function test_validation_fails_for_invalid_email(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'subject' => 'Test',
            'message' => 'Test message',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_phone_is_optional(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test',
            'message' => 'Test message',
        ];

        $response = $this->postJson('/api/messages', $payload);

        $response->assertStatus(201);
    }
}