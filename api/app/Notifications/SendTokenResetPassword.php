<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class SendTokenResetPassword extends Notification
{
    use Queueable;

    protected $code;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url_reset_password = url(env('URL') . '/auth/reset-password/' . "?reset_token=" . $this->token);
        return (new MailMessage)
                    ->subject("Recuperación de Password - ". env("APP_NAME"))
                    ->greeting('Recuperación de Password')
                    ->line('Hola '. $notifiable->first_name . ', hemos enviado este correo electronico porque nos pediste reinciar tu password:')
                    ->action('Reiniciar mi password',  $url_reset_password)
                    ->line('OJO! Si no has sido tu quien pidió reiniciar el password, no uses este email y eliminalo.')
                    ->salutation('Gracias por usar Linkea!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
