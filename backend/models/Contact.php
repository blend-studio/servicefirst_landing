<?php
class Contact {
    private $conn;
    private $table_name = "contacts"; // Assicurati che la tabella si chiami così nel DB

    // Proprietà dell'oggetto
    public $id;
    public $nome;
    public $email;
    public $azienda;
    
    // --- AGGIUNGI QUESTE PROPRIETÀ MANCANTI ---
    public $telefono;
    public $ruolo;
    public $messaggio;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        // Query di inserimento aggiornata con i nuovi campi
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    nome = :nome,
                    email = :email,
                    azienda = :azienda,
                    telefono = :telefono,
                    ruolo = :ruolo,
                    messaggio = :messaggio,
                    created_at = NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitize dei dati
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->azienda = htmlspecialchars(strip_tags($this->azienda));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->ruolo = htmlspecialchars(strip_tags($this->ruolo));
        $this->messaggio = htmlspecialchars(strip_tags($this->messaggio));

        // Binding dei parametri
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":azienda", $this->azienda);
        
        // --- BINDING DEI NUOVI CAMPI ---
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":ruolo", $this->ruolo);
        $stmt->bindParam(":messaggio", $this->messaggio);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>