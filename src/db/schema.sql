-- Where is it ? : schéma de la base SQLite
-- Exécuté à chaque démarrage : "IF NOT EXISTS" évite de recréer les tables.

-- 1) Les comptes
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,            -- un seul compte par e-mail
  password_hash TEXT NOT NULL,                   -- jamais le mot de passe en clair
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2) Les annonces (objets perdus ou trouvés)
CREATE TABLE IF NOT EXISTS items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL CHECK (category IN ('keys', 'bags', 'phone', 'clothes', 'docs')),
  color       TEXT NOT NULL CHECK (color IN ('blue', 'black', 'red', 'green', 'grey', 'brown')),
  place       TEXT NOT NULL,
  date        TEXT NOT NULL,                     -- format AAAA-MM-JJ
  photo       TEXT,                              -- chemin du fichier (phase 5)
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'returned')),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3) Les réclamations ("cet objet est à moi")
CREATE TABLE IF NOT EXISTS claims (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id    INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'refused')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index : accélèrent la recherche par catégorie, type et date (phase 7)
CREATE INDEX IF NOT EXISTS idx_items_search ON items (category, type, date);
CREATE INDEX IF NOT EXISTS idx_claims_item  ON claims (item_id);
