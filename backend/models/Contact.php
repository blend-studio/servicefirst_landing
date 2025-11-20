<?php
class Contact {
    private $conn;
    private $table_name = "leads";

    public $nome;
    public $email;
    public $azienda;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET nome=:nome, email=:email, azienda=:azienda, created_at=NOW()";
        $stmt = $this->conn->prepare($query);

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->azienda = htmlspecialchars(strip_tags($this->azienda));

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":azienda", $this->azienda);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>