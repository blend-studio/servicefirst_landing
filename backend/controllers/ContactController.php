<?php

include_once '../config/database.php';
include_once '../models/Contact.php';

class ContactController {
    public function register() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        $database = new Database();
        $db = $database->getConnection();
        $contact = new Contact($db);

        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->nome) && !empty($data->email)) {
            $contact->nome = $data->nome;
            $contact->email = $data->email;
            $contact->azienda = $data->azienda ?? '';

            if($contact->create()) {
                // Qui potresti aggiungere la logica per inviare la mail (es. PHPMailer)
                // mail($contact->email, "Ecco il tuo catalogo", "Link al catalogo...");
                
                http_response_code(201);
                echo json_encode(array("success" => true, "message" => "Contatto registrato."));
            } else {
                http_response_code(503);
                echo json_encode(array("success" => false, "message" => "Impossibile registrare il contatto."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Dati incompleti."));
        }
    }
}
?>