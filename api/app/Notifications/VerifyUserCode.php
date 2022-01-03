<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class VerifyUserCode extends Notification
{
    use Queueable;

    protected $user;
    protected $verification_code;
    protected $url;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->url = env('URL') . '/auth/verify/';
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
        
        $url_verification = url(env('URL') . '/auth/verify/'. $notifiable->_id .'/' . $notifiable->verification_code);
        return (new MailMessage)
                    ->subject("Verificar usuario - ". env("APP_NAME"))
                    ->greeting('Bienvenido!')
                    ->line('Hola '. $notifiable->first_name . ', te enviamos tu codigo de verificación:')
                    ->line( new HtmlString( '<strong>'. $notifiable->verification_code .'</strong>') )
                    ->line( new HtmlString( "Copia y pega este codigo en la vista de verificación. <bt>Tambien puedes verificar tu usuario ingresando con este botón." ))
                    ->action('Verificar mi usuario',  $url_verification)
                    ->salutation('Gracias por usar '. env("APP_NAME") . '.' );
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
