// Remplit la base en passant par l'API REST (serveur lancé) : node scripts/remplir.js
const API = "http://localhost:3000/api";

async function post(url, body) {
  const res = await fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`POST ${url} : ${res.status} ${data.error}`);
  return data;
}

try {
  // 2 comptes
  // const alice = await post("/users", { nom: "Dupont", prenom: "Alice", email: "alice@test.fr", password: "motdepasse1" });
  // const bob = await post("/users", { nom: "Martin", prenom: "Bob", email: "bob@test.fr", password: "motdepasse1" });
  // // [auteur, type, titre, catégorie, couleur, lieu, ville, date]
  // const annonces = [
  //   [bob,   "lost",  "Sac à dos bleu, cahier à spirale", "bags",    "blue",  "Restaurant universitaire", "Brest", "2026-11-09"],
  //   [alice, "lost",  "Écharpe en laine verte",           "clothes", "green", "Arrêt de tram",            "Brest", "2026-11-08"],
  //   [alice, "found", "Trousseau avec porte-clé en bois", "keys",    "grey",  "Bibliothèque",             "Brest", "2026-11-10"],
  //   [bob,   "found", "Téléphone avec coque noire",       "phone",   "black", "Amphi B",                  "Brest", "2026-11-11"],
  //   [alice, "found", "Portefeuille avec carte étudiante", "docs",   "brown", "Hall des sciences",        "Brest", "2026-11-12"]
  // ];

  const categories = [ 
  ['Clés', 'Keys'],
  ['Téléphones', 'Phones'],
  ['Ordinateurs et tablettes', 'Laptops and tablets'],
  ['Écouteurs et casques', 'Earbuds and headphones'],
  ['Chargeurs et câbles', 'Chargers and cables'],
  ['Clés USB et disques', 'USB drives and disks'],
  ['Calculatrices', 'Calculators'],
  ['Appareils photo', 'Cameras'],
  ['Sacs', 'Bags'],
  ['Portefeuilles et porte-monnaie', 'Wallets and purses'],
  ['Cartes et papiers', 'Cards and papers'],
  ['Livres et cahiers', 'Books and notebooks'],
  ['Trousses et fournitures', 'Pencil cases and stationery'],
  ['Vêtements', 'Clothing'],
  ['Chaussures', 'Shoes'],
  ['Accessoires (écharpes, gants, bonnets)', 'Accessories (scarves, gloves, hats)'],
  ['Lunettes', 'Glasses'],
  ['Montres et bijoux', 'Watches and jewellery'],
  ['Parapluies', 'Umbrellas'],
  ['Gourdes et bouteilles', 'Water bottles and flasks'],
  ['Vélos et trottinettes', 'Bikes and scooters'],
  ['Matériel de sport', 'Sports gear'],
  ['Instruments de musique', 'Musical instruments'],
  ['Autre', 'Other']
  ];

  for (const [label_fr, label_en] of categories) {
    await post("/categories", { label_fr, label_en });
  }

  // for (const [auteur, type, title, category, color, place, city, date] of annonces) {
  //   await post("/items", { user_id: auteur.id, type, title, category, color, place, city, date });
  // }
  console.log("Terminé : 2 comptes, 2 annonces perdues, 3 annonces trouvées.");
} catch (e) {
  console.error("Échec :", e.message);
}