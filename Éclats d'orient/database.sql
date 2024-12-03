-- Création de la base de données
CREATE DATABASE IF NOT EXISTS eclats_orient;
USE eclats_orient;

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    adresse TEXT NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    commande_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'en_attente',
    montant_total DECIMAL(10,2) NOT NULL,
    mode_paiement VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- Table des détails des commandes
CREATE TABLE IF NOT EXISTS details_commande (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    sous_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(commande_id)
);

-- Table des produits
CREATE TABLE IF NOT EXISTS produits (
    produit_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categorie VARCHAR(100),
    image_url VARCHAR(255)
);

-- Index pour optimiser les recherches
CREATE INDEX idx_client_email ON clients(email);
CREATE INDEX idx_commande_date ON commandes(date_commande);
CREATE INDEX idx_commande_statut ON commandes(statut);
CREATE INDEX idx_produit_categorie ON produits(categorie);
