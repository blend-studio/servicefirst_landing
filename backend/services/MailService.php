<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService {
    
    // --- CONFIGURAZIONE COMUNE SMTP ---
    private function getMailer() {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER']; // Utente per il login SMTP
        $mail->Password   = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
        $mail->Port       = $_ENV['SMTP_PORT'];
        
        // CORREZIONE: Usa SMTP_FROM per il mittente visibile (info@blendstudio.it)
        $mail->setFrom($_ENV['SMTP_FROM'], $_ENV['SMTP_FROM_NAME']);
        
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        return $mail;
    }

    // 1. EMAIL AL CLIENTE (Conferma ricezione)
    public function sendConfirmation($toEmail, $toName) {
        try {
            $mail = $this->getMailer();
            $mail->addAddress($toEmail, $toName);

            $mail->Subject = 'Benvenuto in ServiceFirst - La tua Demo è confermata!';
            $mail->Body    = $this->getUserHtmlTemplate($toName);
            $mail->AltBody = 'Ciao ' . $toName . ', grazie per aver richiesto una demo. Ti contatteremo a breve.';

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Mail Error (User): " . $mail->ErrorInfo);
            return false;
        }
    }

    // 2. EMAIL ALL'ADMIN (Notifica nuovo lead)
    public function sendAdminNotification($contactData) {
        try {
            $mail = $this->getMailer();
            
            // 1. Imposta il destinatario principale (info@blendstudio.it)
            $adminEmail = $_ENV['ADMIN_EMAIL'];
            $mail->addAddress($adminEmail, 'Admin ServiceFirst');

            // 2. Gestione dei CC (lorenzo@..., matteo@...)
            if (!empty($_ENV['ADMIN_CC_EMAILS'])) {
                // Divide la stringa in un array basandosi sulla virgola
                $ccEmails = explode(',', $_ENV['ADMIN_CC_EMAILS']);
                
                foreach ($ccEmails as $cc) {
                    $cc = trim($cc); // Rimuove eventuali spazi vuoti
                    if (!empty($cc)) {
                        $mail->addCC($cc);
                    }
                }
            }

            // Reply-To impostato sulla mail del lead per rispondere subito cliccando "Rispondi"
            $mail->addReplyTo($contactData->email, $contactData->nome);

            $mail->Subject = ' Nuovo Lead: ' . $contactData->azienda . ' - ' . $contactData->nome;
            $mail->Body    = $this->getAdminHtmlTemplate($contactData);
            $mail->AltBody = "Nuovo lead ricevuto da {$contactData->nome} ({$contactData->azienda}).";

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Mail Error (Admin): " . $mail->ErrorInfo);
            return false;
        }
    }

    // --- TEMPLATE UTENTE ---
    private function getUserHtmlTemplate($name) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; background-color: #f3f4f6; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background-color: #0d9488; padding: 30px; text-align: center; color: white; }
                .content { padding: 30px; color: #333; line-height: 1.6; }
                .btn { display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><h1>Richiesta Ricevuta!</h1></div>
                <div class="content">
                    <h2>Ciao ' . htmlspecialchars($name) . ',</h2>
                    <p>Grazie per il tuo interesse in <strong>ServiceFirst</strong>.</p>
                    <p>Abbiamo ricevuto la tua richiesta di demo. Il nostro team analizzerà le tue esigenze e ti contatterà entro 24 ore.</p>
                    <center><a href="https://servicefirst.it" class="btn">Torna al sito</a></center>
                </div>
            </div>
        </body>
        </html>';
    }

    // --- TEMPLATE ADMIN ---
    private function getAdminHtmlTemplate($data) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; background-color: #f3f4f6; padding: 20px; }
                .card { background: white; padding: 20px; border-left: 5px solid #0d9488; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th { text-align: left; padding: 10px; background: #f9fafb; border-bottom: 2px solid #e5e7eb; width: 30%; }
                td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
                .tag { background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2> Nuovo Lead dal Sito</h2>
                <p>È stata ricevuta una nuova richiesta di demo.</p>
                <table>
                    <tr><th>Nome</th><td>' . htmlspecialchars($data->nome) . '</td></tr>
                    <tr><th>Azienda</th><td><strong>' . htmlspecialchars($data->azienda) . '</strong></td></tr>
                    <tr><th>Email</th><td><a href="mailto:' . htmlspecialchars($data->email) . '">' . htmlspecialchars($data->email) . '</a></td></tr>
                    <tr><th>Telefono</th><td>' . htmlspecialchars($data->telefono) . '</td></tr>
                    <tr><th>Ruolo</th><td>' . htmlspecialchars($data->ruolo) . '</td></tr>
                    <tr><th>Messaggio</th><td>' . nl2br(htmlspecialchars($data->messaggio)) . '</td></tr>
                    <tr><th>Data</th><td>' . date('d/m/Y H:i') . '</td></tr>
                </table>
            </div>
        </body>
        </html>';
    }
}
?>