<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class WelcomeMessage extends Notification
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
                    ->subject("Bienvenido a ". env("APP_NAME")  . " " . Str::ucfirst($notifiable->first_name))
                    ->greeting('Bienvenido a '. env("APP_NAME"))
                    ->line('Hola '. $notifiable->first_name . ', esperamos nuestra plataforma te sea super útil y por ello desees compartirla con todos tus contactos.')
                    ->line('Te mantendremos al tanto de las actualizaciones atravez de las notificaciones de la plataforma. Que lo disfrutes.')
                    ->salutation('Una vez más, gracias por usar ' . env("APP_NAME") . '.');
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
