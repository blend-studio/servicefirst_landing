<?php
// FILE: backend/api/contact.php

// 1. PULIZIA BUFFER (Evita spazi vuoti prima degli header)
ob_start();

// 2. HEADERS CORS "BRUTE FORCE" (Senza condizioni)
// Mettiamo l'indirizzo esatto del tuo frontend. Niente wildcard (*), niente controlli isset.
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400"); // Cache preflight per 24h

// 3. GESTIONE PREFLIGHT (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Puliamo qualsiasi output precedente
    ob_clean();
    // Inviamo solo gli header e chiudiamo
    http_response_code(200);
    exit();
}

// 4. CONFIGURAZIONE ERRORI E JSON
ini_set('display_errors', 0); // Nascondiamo errori HTML per non rompere il JSON
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

// 5. CARICAMENTO CONTROLLER
$controllerPath = __DIR__ . '/../controllers/ContactController.php';

// Debug: Se il file non c'è, diamo un JSON valido di errore
if (!file_exists($controllerPath)) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Errore: Controller non trovato nel percorso: " . $controllerPath
    ]);
    exit();
}

// 6. ESECUZIONE LOGICA
try {
    require_once $controllerPath;
    
    $controller = new ContactController();
    $controller->register();

} catch (Throwable $e) {
    // Catturiamo qualsiasi errore fatale
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Errore Server: " . $e->getMessage()
    ]);
}

// Invio buffer finale
ob_end_flush();
?>