<?php
class Database {
    private $host;
    private $port; // Nuova variabile
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $this->host = $_ENV['DB_HOST'];
        $this->port = $_ENV['DB_PORT'] ?? 3306; // Default a 3306 se manca
        $this->db_name = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USER'];
        $this->password = $_ENV['DB_PASS'];
    }

    public function getConnection() {
        $this->conn = null;
        try {
            // Aggiunta la porta nel DSN
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name;
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Importante per vedere gli errori SQL
            $this->conn->exec("set names utf8");
            
        } catch(PDOException $exception) {
            // LOG DELL'ERRORE DI CONNESSIONE
            error_log("Errore Connessione DB: " . $exception->getMessage());
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>