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