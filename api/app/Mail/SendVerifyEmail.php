<?php
namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class SendVerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The order instance.
     *
     * @var \App\Models\Order
     */
    protected $user;
    protected $code;

    /**
     * Create a new message instance.
     *
     * @param \App\Models\Order $order
     * @return void
     */
    public function __construct()
    {
        $this->code = sha1(Str::random(32));
        $this->user = auth()->user();
        $this->user->update(["verification_code" => $this->code]);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.html.message') // 'emails.registration.verification-code'
            ->with([
                'line' => $this->user->first_name,
                'code' => $this->code,
            ]);
    }
}