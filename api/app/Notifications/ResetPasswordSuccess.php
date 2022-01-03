<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class ResetPasswordSuccess extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(){}

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
        return (new MailMessage)
                    ->subject("Reinicio de Password Completo - ". env("APP_NAME"))
                    ->greeting('Reinicio de Password Completo')
                    ->line('Excelente '. $notifiable->first_name . ', tu password fue reiniciado correctamente y ya puedes ingresar de nuevo con tu usuario a la plataforma')
                    ->line('OJO! Si no has sido tu quien reinicio el password, comunicate inmediatamente con soporte tecnico.')
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
