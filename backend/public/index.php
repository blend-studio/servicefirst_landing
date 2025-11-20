<?php
// Semplice router
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'register') {
    include_once '../controllers/ContactController.php';
    $controller = new ContactController();
    $controller->register();
} else {
    echo "API ServiceFirst Ready";
}
?>