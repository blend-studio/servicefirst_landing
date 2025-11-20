<?php
// FILE: backend/controllers/ContactController.php

// Usa __DIR__ per risalire correttamente alla cartella vendor
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Usa require_once con percorsi assoluti per evitare errori di inclusione
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Contact.php';
require_once __DIR__ . '/../services/MailService.php';

class ContactController {
    public function register() {
        
        // --- RIMOSSI TUTTI GLI HEADER CORS DA QUI (Gestritti in api/contact.php) ---

        // 1. Logging Input
        $input = file_get_contents("php://input");
        error_log("API Contact chiamata. Payload: " . $input);

        $database = new Database();
        $db = $database->getConnection();

        if (!$db) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Database connection failed"]);
            return;
        }

        $contact = new Contact($db);
        $mailService = new MailService();

        $data = json_decode($input);

        // Verifica che i dati esistano prima di accedervi
        if(isset($data->nome) && isset($data->email)) {
            $contact->nome = $data->nome;
            $contact->email = $data->email;
            $contact->azienda = $data->azienda ?? '';
            $contact->telefono = $data->telefono ?? '';
            $contact->ruolo = $data->ruolo ?? '';
            $contact->messaggio = $data->messaggio ?? '';

            if($contact->create()) {
                // ... resto della logica invio mail ...
                $userMailSent = $mailService->sendConfirmation($contact->email, $contact->nome);
                $adminMailSent = $mailService->sendAdminNotification($contact);

                http_response_code(201);
                echo json_encode([
                    "success" => true, 
                    "message" => "Contatto registrato."
                ]);
            } else {
                http_response_code(503);
                echo json_encode(["success" => false, "message" => "Errore salvataggio DB."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Dati incompleti."]);
        }
    }
}
?>