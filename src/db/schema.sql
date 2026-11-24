-- Where is it ? : schéma de la base SQLite
-- Exécuté à chaque démarrage : "IF NOT EXISTS" évite de recréer les tables.

-- 1) Les comptes
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nom           TEXT NOT NULL,
  prenom        TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,            -- un seul compte par e-mail
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
); 

-- 2) Les annonces (objets perdus ou trouvés)
CREATE TABLE IF NOT EXISTS items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type_id     INTEGER NOT NULL REFERENCES itemType(id),
  title       TEXT NOT NULL,
  description TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  color_id    INTEGER NOT NULL REFERENCES colors(id),
  place       TEXT NOT NULL,
  city_id     INTEGER NOT NULL REFERENCES cities(id),
  date        TEXT NOT NULL,                     -- format AAAA-MM-JJ
  photo       TEXT,                              -- chemin du fichier (phase 5)
  status_id   INTEGER NOT NULL DEFAULT 1 REFERENCES itemStatus(id),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3) Les réclamations ("cet objet est à moi")
CREATE TABLE IF NOT EXISTS claims (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id    INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  claimant_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status_id  INTEGER NOT NULL DEFAULT 1 REFERENCES claimStatus(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (item_id, claimant_id)
);

-- 4) Les catégories 
CREATE TABLE IF NOT EXISTS categories (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  label_fr TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL
);

-- 5) Les couleurs
CREATE TABLE IF NOT EXISTS colors (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  label_fr TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  hex      TEXT NOT NULL                 -- couleur d'affichage
);

-- 6) les types d'objets (perdu ou trouvé)
CREATE TABLE IF NOT EXISTS itemType (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  label_fr TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  hex      TEXT NOT NULL                -- couleur d'affichage
);

-- 7) les statuts des objets (ouvert ou rendu)
CREATE TABLE IF NOT EXISTS itemStatus (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  label_fr TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  hex      TEXT NOT NULL                -- couleur d'affichage
);

-- 8) les statuts des réclamations
CREATE TABLE IF NOT EXISTS claimStatus (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  label_fr TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  hex      TEXT NOT NULL                -- couleur d'affichage
);

-- 9) les messages entre le propriétaire de l'objet et le réclamant
CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id   INTEGER NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  sender_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  read_at    TEXT,                                -- NULL = pas encore lu
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 10) les villes
CREATE TABLE IF NOT EXISTS cities (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  UNIQUE (name, postal_code)
);


-- Données initiales pour les tables de référence
INSERT OR IGNORE INTO itemType (label_fr, label_en, hex) 
VALUES
  ('Perdu', 'Lost', '#D6382F'), 
  ('Trouvé', 'Found', '#0E7C66');

INSERT OR IGNORE INTO itemStatus (label_fr, label_en, hex) 
VALUES
  ('Ouvert', 'Open', '#3B6EA5'), 
  ('Rendu', 'Returned', '#6B7280');

INSERT OR IGNORE INTO claimStatus (label_fr, label_en, hex) 
VALUES
  ('En attente', 'Pending', '#9A6700'), 
  ('Acceptée', 'Accepted', '#2F7D4F'),
  ('Refusée', 'Refused', '#B3382C'), 
  ('Clôturée', 'Closed', '#6B7280');

INSERT OR IGNORE INTO cities (name, postal_code) 
VALUES
  ('Brest', '29200'), 
  ('Quimper', '29000'), 
  ('Morlaix', '29600'), 
  ('Lorient', '56100'), 
  ('Rennes', '35000');

INSERT OR IGNORE INTO categories (label_fr, label_en) 
VALUES 
  ('Clés', 'Keys'),
  ('Téléphones', 'Phones'),
  ('Ordinateurs et tablettes', 'Laptops and tablets'),
  ('Écouteurs et casques', 'Earbuds and headphones'),
  ('Chargeurs et câbles', 'Chargers and cables'),
  ('Clés USB et disques', 'USB drives and disks'),
  ('Calculatrices', 'Calculators'),
  ('Appareils photo', 'Cameras'),
  ('Sacs', 'Bags'),
  ('Portefeuilles et porte-monnaie', 'Wallets and purses'),
  ('Cartes et papiers', 'Cards and papers'),
  ('Livres et cahiers', 'Books and notebooks'),
  ('Trousses et fournitures', 'Pencil cases and stationery'),
  ('Vêtements', 'Clothing'),
  ('Chaussures', 'Shoes'),
  ('Accessoires (écharpes, gants, bonnets)', 'Accessories (scarves, gloves, hats)'),
  ('Lunettes', 'Glasses'),
  ('Montres et bijoux', 'Watches and jewellery'),
  ('Parapluies', 'Umbrellas'),
  ('Gourdes et bouteilles', 'Water bottles and flasks'),
  ('Vélos et trottinettes', 'Bikes and scooters'),
  ('Matériel de sport', 'Sports gear'),
  ('Instruments de musique', 'Musical instruments'),
  ('Autre', 'Other');

INSERT OR IGNORE INTO colors (label_fr, label_en, hex) VALUES
  ('Noir', 'Black', '#222222'),
  ('Blanc', 'White', '#FFFFFF'),
  ('Gris', 'Grey', '#8a8f94'),
  ('Beige', 'Beige', '#D9C5A0'),
  ('Marron', 'Brown', '#7a5232'),
  ('Rouge', 'Red', '#b3382c'),
  ('Rose', 'Pink', '#E88AA8'),
  ('Orange', 'Orange', '#E8892B'),
  ('Jaune', 'Yellow', '#F2C230'),
  ('Vert', 'Green', '#4c8a5a'),
  ('Turquoise', 'Turquoise', '#2BB3B1'),
  ('Bleu clair', 'Light blue', '#8CC4EC'),
  ('Bleu', 'Blue', '#3b6ea5'),
  ('Violet', 'Purple', '#7B4FA3'),
  ('Doré', 'Gold', '#C9A227'),
  ('Argenté', 'Silver', '#C0C0C0'),
  ('Transparent', 'Clear', '#DDEBF0'),
  ('Multicolore', 'Multicolour', 'linear-gradient(90deg,#b3382c,#F2C230,#4c8a5a,#3b6ea5)');


-- Index : accélèrent la recherche par catégorie, type et date
CREATE INDEX IF NOT EXISTS idx_items_user ON items (user_id);
CREATE INDEX IF NOT EXISTS idx_claims_claimant ON claims (claimant_id);
CREATE INDEX IF NOT EXISTS idx_items_search ON items (category_id, type_id, date);
CREATE INDEX IF NOT EXISTS idx_messages_claim ON messages (claim_id, created_at);
CREATE INDEX IF NOT EXISTS idx_items_city ON items (city_id);



-- donnes de test
INSERT OR IGNORE INTO users (nom, prenom, email, password_hash)
VALUES
('Martin', 'Lucas', 'lucas.martin@test.fr', 'HASH_TEST_1'),
('Le Goff', 'Emma', 'emma.legoff@test.fr', 'HASH_TEST_2'),
('Bernard', 'Adam', 'adam.bernard@test.fr', 'HASH_TEST_3'),
('Moreau', 'Sarah', 'sarah.moreau@test.fr', 'HASH_TEST_4'),
('Petit', 'Thomas', 'thomas.petit@test.fr', 'HASH_TEST_5'),
('Dubois', 'Lina', 'lina.dubois@test.fr', 'HASH_TEST_6');




-- 1 : Clés perdues
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'lucas.martin@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'Trousseau de clés perdu',
    'Trousseau de trois clés avec porte-clés bleu.',
    (SELECT id FROM categories WHERE label_fr = 'Clés'),
    (SELECT id FROM colors WHERE label_fr = 'Bleu'),
    'Bibliothèque universitaire',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-10'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Trousseau de clés perdu'
);

-- 2 : Clés trouvées (correspondance potentielle avec annonce 1)
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'emma.legoff@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Trousseau de clés trouvé',
    'Trois clés avec un porte-clés bleu trouvées près de la bibliothèque.',
    (SELECT id FROM categories WHERE label_fr = 'Clés'),
    (SELECT id FROM colors WHERE label_fr = 'Bleu'),
    'Bibliothèque universitaire',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-11'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Trousseau de clés trouvé'
);

-- 3 : Téléphone perdu
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'adam.bernard@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'iPhone perdu',
    'iPhone noir avec coque transparente.',
    (SELECT id FROM categories WHERE label_fr = 'Téléphones'),
    (SELECT id FROM colors WHERE label_fr = 'Noir'),
    'Amphithéâtre A',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-12'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'iPhone perdu'
);

-- 4 : Téléphone trouvé
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'sarah.moreau@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Téléphone trouvé amphithéâtre',
    'Téléphone noir avec coque transparente trouvé sur une chaise.',
    (SELECT id FROM categories WHERE label_fr = 'Téléphones'),
    (SELECT id FROM colors WHERE label_fr = 'Noir'),
    'Amphithéâtre A',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-12'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Téléphone trouvé amphithéâtre'
);

-- 5 : Sac perdu
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'thomas.petit@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'Sac à dos perdu',
    'Sac à dos noir contenant des cahiers et une trousse.',
    (SELECT id FROM categories WHERE label_fr = 'Sacs'),
    (SELECT id FROM colors WHERE label_fr = 'Noir'),
    'Hall du bâtiment C',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-08'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Sac à dos perdu'
);

-- 6 : Sac trouvé
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'lina.dubois@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Sac noir trouvé',
    'Sac noir avec plusieurs cahiers à l intérieur.',
    (SELECT id FROM categories WHERE label_fr = 'Sacs'),
    (SELECT id FROM colors WHERE label_fr = 'Noir'),
    'Hall du bâtiment C',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-09'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Sac noir trouvé'
);

-- 7 : Carte étudiante perdue
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'lucas.martin@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'Carte étudiante perdue',
    'Carte étudiante dans un étui transparent.',
    (SELECT id FROM categories WHERE label_fr = 'Cartes et papiers'),
    (SELECT id FROM colors WHERE label_fr = 'Transparent'),
    'Cafétéria',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-13'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Carte étudiante perdue'
);

-- 8 : Carte trouvée
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'emma.legoff@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Carte étudiante trouvée',
    'Carte trouvée près des tables de la cafétéria.',
    (SELECT id FROM categories WHERE label_fr = 'Cartes et papiers'),
    (SELECT id FROM colors WHERE label_fr = 'Transparent'),
    'Cafétéria',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-13'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Carte étudiante trouvée'
);

-- 9 : Ordinateur perdu
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'adam.bernard@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'Ordinateur portable perdu',
    'Ordinateur gris de marque Lenovo avec autocollant.',
    (SELECT id FROM categories WHERE label_fr = 'Ordinateurs et tablettes'),
    (SELECT id FROM colors WHERE label_fr = 'Gris'),
    'Salle informatique 204',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-14'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Ordinateur portable perdu'
);

-- 10 : Écouteurs trouvés
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'sarah.moreau@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Écouteurs trouvés',
    'Écouteurs sans fil blancs dans leur boîtier.',
    (SELECT id FROM categories WHERE label_fr = 'Écouteurs et casques'),
    (SELECT id FROM colors WHERE label_fr = 'Blanc'),
    'Salle informatique 204',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-14'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Écouteurs trouvés'
);

-- 11 : Gourde perdue
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'thomas.petit@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Perdu'),
    'Gourde perdue',
    'Gourde métallique verte avec bouchon noir.',
    (SELECT id FROM categories WHERE label_fr = 'Gourdes et bouteilles'),
    (SELECT id FROM colors WHERE label_fr = 'Vert'),
    'Terrain de sport',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-15'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Gourde perdue'
);

-- 12 : Montre trouvée
INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
SELECT
    (SELECT id FROM users WHERE email = 'lina.dubois@test.fr'),
    (SELECT id FROM itemType WHERE label_fr = 'Trouvé'),
    'Montre trouvée',
    'Montre avec bracelet argenté trouvée dans un couloir.',
    (SELECT id FROM categories WHERE label_fr = 'Montres et bijoux'),
    (SELECT id FROM colors WHERE label_fr = 'Argenté'),
    'Couloir bâtiment A',
    (SELECT id FROM cities WHERE name = 'Brest' AND postal_code = '29200'),
    '2026-11-16'
WHERE NOT EXISTS (
    SELECT 1 FROM items WHERE title = 'Montre trouvée'
);




-- Réclamation 1 : Lucas réclame le trousseau trouvé (en attente)
INSERT OR IGNORE INTO claims (item_id, claimant_id, status_id)
VALUES (
    (SELECT id FROM items WHERE title = 'Trousseau de clés trouvé'),
    (SELECT id FROM users WHERE email = 'lucas.martin@test.fr'),
    (SELECT id FROM claimStatus WHERE label_fr = 'En attente')
);

-- Réclamation 2 : Adam réclame le téléphone trouvé (acceptée)
INSERT OR IGNORE INTO claims (item_id, claimant_id, status_id)
VALUES (
    (SELECT id FROM items WHERE title = 'Téléphone trouvé amphithéâtre'),
    (SELECT id FROM users WHERE email = 'adam.bernard@test.fr'),
    (SELECT id FROM claimStatus WHERE label_fr = 'Acceptée')
);

-- Réclamation 3 : Thomas réclame le sac trouvé (refusée)
INSERT OR IGNORE INTO claims (item_id, claimant_id, status_id)
VALUES (
    (SELECT id FROM items WHERE title = 'Sac noir trouvé'),
    (SELECT id FROM users WHERE email = 'thomas.petit@test.fr'),
    (SELECT id FROM claimStatus WHERE label_fr = 'Refusée')
);

-- Réclamation 4 : Lucas réclame la carte trouvée (clôturée)
INSERT OR IGNORE INTO claims (item_id, claimant_id, status_id)
VALUES (
    (SELECT id FROM items WHERE title = 'Carte étudiante trouvée'),
    (SELECT id FROM users WHERE email = 'lucas.martin@test.fr'),
    (SELECT id FROM claimStatus WHERE label_fr = 'Clôturée')
);






-- Messages pour le trousseau de clés
INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Bonjour, je pense que ce trousseau est le mien. Il possède trois clés et un porte-clés bleu.'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'lucas.martin@test.fr'
WHERE i.title = 'Trousseau de clés trouvé'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Bonjour, je pense que ce trousseau est le mien. Il possède trois clés et un porte-clés bleu.'
);

INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Bonjour, pouvez-vous me préciser où et quand vous avez perdu vos clés ?'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'emma.legoff@test.fr'
WHERE i.title = 'Trousseau de clés trouvé'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Bonjour, pouvez-vous me préciser où et quand vous avez perdu vos clés ?'
);

-- Messages pour le téléphone
INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Le téléphone perdu est bien un iPhone noir avec une coque transparente.'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'adam.bernard@test.fr'
WHERE i.title = 'Téléphone trouvé amphithéâtre'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Le téléphone perdu est bien un iPhone noir avec une coque transparente.'
);

INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Merci pour les précisions. La réclamation est acceptée.'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'sarah.moreau@test.fr'
WHERE i.title = 'Téléphone trouvé amphithéâtre'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Merci pour les précisions. La réclamation est acceptée.'
);

-- Messages pour le sac
INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Je pense que ce sac est le mien, il contient des cahiers et une trousse.'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'thomas.petit@test.fr'
WHERE i.title = 'Sac noir trouvé'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Je pense que ce sac est le mien, il contient des cahiers et une trousse.'
);

INSERT INTO messages (claim_id, sender_id, body)
SELECT
    c.id,
    u.id,
    'Les informations ne permettent pas de confirmer que le sac vous appartient.'
FROM claims c
JOIN items i ON i.id = c.item_id
JOIN users u ON u.email = 'lina.dubois@test.fr'
WHERE i.title = 'Sac noir trouvé'
AND NOT EXISTS (
    SELECT 1 FROM messages m
    WHERE m.claim_id = c.id AND m.body = 'Les informations ne permettent pas de confirmer que le sac vous appartient.'
);







