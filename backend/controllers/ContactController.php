<?php

// Carica l'autoload di Composer per Dotenv e PHPMailer
require_once '../vendor/autoload.php';

// Carica le variabili d'ambiente
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

include_once '../config/database.php';
include_once '../models/Contact.php';
include_once '../services/MailService.php';

class ContactController {
    public function register() {
        // Headers CORS
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        // Gestione preflight request
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $database = new Database();
        $db = $database->getConnection();
        $contact = new Contact($db);
        $mailService = new MailService();

        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->nome) && !empty($data->email)) {
            $contact->nome = $data->nome;
            $contact->email = $data->email;
            $contact->azienda = $data->azienda ?? '';
            $contact->telefono = $data->telefono ?? '';
            $contact->ruolo = $data->ruolo ?? '';
            $contact->messaggio = $data->messaggio ?? '';

            if($contact->create()) {
                // Invio Email di Conferma
                $mailSent = $mailService->sendConfirmation($contact->email, $contact->nome);
                
                http_response_code(201);
                echo json_encode(array(
                    "success" => true, 
                    "message" => "Contatto registrato.",
                    "mail_sent" => $mailSent
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("success" => false, "message" => "Impossibile registrare il contatto nel DB."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Dati incompleti."));
        }
    }
}
?>