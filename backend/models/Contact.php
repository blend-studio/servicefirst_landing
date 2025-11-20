<?php
class Contact {
    private $conn;
    // CORREZIONE 1: Il nome della tua tabella è 'leads', non 'contacts'
    private $table_name = "leads";

    // Proprietà dell'oggetto
    public $id;
    public $nome;
    public $email;
    public $azienda;
    public $telefono;
    public $ruolo;
    public $messaggio;
    public $privacy; // CORREZIONE 2: Aggiunta proprietà mancante
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        // Query di inserimento
        // CORREZIONE 3: Aggiunto il campo privacy nella query SQL
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    nome = :nome,
                    email = :email,
                    azienda = :azienda,
                    telefono = :telefono,
                    ruolo = :ruolo,
                    messaggio = :messaggio,
                    privacy = :privacy,
                    created_at = NOW()";

        $stmt = $this->conn->prepare($query);

        // Sanitize dei dati (pulizia input)
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->azienda = htmlspecialchars(strip_tags($this->azienda));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->ruolo = htmlspecialchars(strip_tags($this->ruolo));
        $this->messaggio = htmlspecialchars(strip_tags($this->messaggio));
        
        // Gestione booleano per privacy (true diventa 1, false diventa 0)
        $this->privacy = $this->privacy ? 1 : 0;

        // Binding dei parametri
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":azienda", $this->azienda);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":ruolo", $this->ruolo);
        $stmt->bindParam(":messaggio", $this->messaggio);
        $stmt->bindParam(":privacy", $this->privacy);

        // Esecuzione con gestione errori
        try {
            if($stmt->execute()) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            // LOG CRITICO
            error_log("Errore SQL in Contact->create(): " . $e->getMessage());
            return false;
        }
    }
}
?>