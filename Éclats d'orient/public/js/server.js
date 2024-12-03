const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes test
app.get('/api/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1');
        res.json({ message: 'Connexion à la base de données réussie!' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur de connexion à la base de données' });
    }
});

// Route pour récupérer les produits
app.get('/api/produits', async (req, res) => {
    try {
        const [produits] = await db.query('SELECT * FROM produits');
        res.json(produits);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
});

// Route pour créer une commande
app.post('/api/commandes', async (req, res) => {
    try {
        const { client_id, produits, montant_total, mode_paiement } = req.body;
        
        // Création de la commande
        const [result] = await db.query(
            'INSERT INTO commandes (client_id, montant_total, mode_paiement) VALUES (?, ?, ?)',
            [client_id, montant_total, mode_paiement]
        );
        
        const commande_id = result.insertId;
        
        // Ajout des détails de la commande
        for (const produit of produits) {
            await db.query(
                'INSERT INTO details_commande (commande_id, produit_id, quantite, prix_unitaire, sous_total) VALUES (?, ?, ?, ?, ?)',
                [commande_id, produit.id, produit.quantite, produit.prix, produit.quantite * produit.prix]
            );
        }
        
        res.json({ message: 'Commande créée avec succès', commande_id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
