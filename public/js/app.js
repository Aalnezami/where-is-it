const API = "/api";
/**
 * variable globale pour savoir si l'utilisateur recherche un objet perdu ou trouvé
 * -1 : aucun objet sélectionné
 * 1 : objet perdu
 * 2 : objet trouvé
 */
var objetRecherche = -1;

/**
 * Sélectionne l'objet de recherche 
 * @param {*} id 1 pour objet perdu et 2 pour objet trouvé
 */
function selectObjetRecherche(id) {
    iconObjPerdu = document.getElementById("icon_check_perdu");
    iconObjTrouve = document.getElementById("icon_check_trouve");
    iconObjSelectionne = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                        </svg>`;
    if (id == 1) {
        iconObjPerdu.innerHTML = iconObjSelectionne;
        iconObjTrouve.innerHTML = "";
        objetRecherche = 1;
    } else if (id == 2) {
        iconObjTrouve.innerHTML = iconObjSelectionne;
        iconObjPerdu.innerHTML = "";
        objetRecherche = 2;
    }
}

/**
 * lister les catégories dans le select
 */
function listerCategories(appliLanguage) {
    fetch(API+"/categories")
        .then(response => response.json())
        .then(data => {
            const selectCategorie = document.getElementById("categorie");
            data.forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie.id;
                option.textContent = appliLanguage === "en" ? categorie.label_en : categorie.label_fr;
                selectCategorie.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
}
listerCategories(document.documentElement.lang);

/**
 * lister les couleurs dans le select
 */
// Choisit texte noir ou blanc selon la clarté du fond, pour rester lisible
function texteLisible(hex) {
    const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#000" : "#fff";
}

function listerCouleurs(appliLanguage) {
    fetch(API + "/colors")
        .then(response => response.json())
        .then(data => {
            const selectCouleur = document.getElementById("couleurs");
            data.forEach(couleur => {
                const option = document.createElement("option");
                option.value = couleur.id;
                option.textContent = appliLanguage === "en" ? couleur.label_en : couleur.label_fr;
                if (couleur.hex.startsWith("#")) {          // "Multicolore" est un dégradé : pas de fond
                    option.style.backgroundColor = couleur.hex;
                    option.style.color = texteLisible(couleur.hex);
                }
                selectCouleur.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des couleurs :", error));
}

// La liste fermée prend la couleur de l'option choisie
document.getElementById("couleurs").addEventListener("change", e => {
    const o = e.target.selectedOptions[0];
    e.target.style.backgroundColor = o.style.backgroundColor;
    e.target.style.color = o.style.color;
});

listerCouleurs(document.documentElement.lang);

/**
 * lister les villes dans le select
 */
function listerVilles() {
    fetch(API+"/cities")
        .then(response => response.json())
        .then(data => {
            const selectVille = document.getElementById("villes");
            data.forEach(ville => {
                const option = document.createElement("option");
                option.value = ville.id;
                option.textContent = `${ville.name} (${ville.postal_code})`;
                selectVille.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des villes :", error));
}
listerVilles();


// début du code fait par l'IA ------------------------------------------------------
/** ---------------------------------------------------------------------------------
 * Fond de photos qui défilent 
 *  Photos dans public/img/hero/ puis liste leurs noms ici.
 */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = id => document.getElementById(id);

const HERO_PHOTOS = ["img/hero/cles.jpg", "img/hero/pf.jpg", "img/hero/montre.jpg", "img/hero/rc.jpg"];
const PALETTE = [["#FF6B5E", "#D6382F"], ["#38D9B4", "#0E7C66"], ["#FFC845", "#E0A020"], ["#6F7BFF", "#2C35A0"]];

function buildHero() {
  const n = HERO_PHOTOS.length || 8;
  ["rowA", "rowB"].forEach((id, row) => {
    let html = "";
    for (let k = 0; k < 2; k++) {            // contenu doublé pour une boucle sans coupure
      for (let i = 0; i < n; i++) {
        const j = (i + row * 3) % n, r = ((i * 7 + row * 5) % 5) - 2;
        html += HERO_PHOTOS.length
          ? `<img class="ph" src="${esc(HERO_PHOTOS[j])}" alt="" loading="lazy" style="--r:${r}deg">`
          : `<div class="ph blank" style="--r:${r}deg;--c1:${PALETTE[j % 4][0]};--c2:${PALETTE[j % 4][1]}"></div>`;
      }
    }
    $(id).innerHTML = html;
  });
}

// WCAG 2.2.2 : un contenu qui bouge doit pouvoir être mis en pause
function updatePause() {
  const paused = $("hero").classList.contains("paused");
  $("pause").setAttribute("aria-pressed", String(paused));
  $("pause").textContent = (paused ? "▶ " : "⏸ ") + t(paused ? "pause.play" : "pause.stop");
}
$("pause").addEventListener("click", () => { $("hero").classList.toggle("paused"); updatePause(); });

buildHero();
updatePause();
