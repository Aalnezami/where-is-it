const API = "/api";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = id => document.getElementById(id);
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

/**
 * Affiche un message d'alerte dans la page, qui disparaît après 5 secondes
 * @param {*} message 
 * @param {*} type 
 */
function afficherMessage(message, type) {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = `<div class="text-center alert alert-${type}" role="alert">${message}</div>`;
    messageContainer.classList.remove("d-none");
    setTimeout(() => {
        messageContainer.classList.add("d-none");
    }, 20000); // Masquer le message après 5 secondes
}

/** Recopie les critères de la page dans les filtres du pop-up */
function copierValeursRecherchees() {
    [["categorie", "mCat"], ["villes", "mCity"], ["couleurs", "mColor"]].forEach(([src, dst]) => {
        $(dst).innerHTML = $(src).innerHTML;
        $(dst).value = $(src).value;
    });
    $("mQ").value = $("q").value;
    $(objetRecherche === 1 ? "mLost" : "mFound").checked = true;
}

/** 
 * Nombre de résultats, ou message "aucune annonce" 
 */
function afficherCompteur(total) {
    const vide = total === 0;
    $("mCount").className = vide ? "h4 text-center pt-4 mb-0" : "text-muted";
    $("mCount").textContent = vide ? t("results.empty") : t(total === 1 ? "count.1" : "count.n", { n: total });
}

/** 
 * Liste des cartes (ou conseil si la liste est vide) 
 */
function afficherAnnonces(items) {
    $("mResults").innerHTML = items.length
        ? items.map(creerCarte).join("")
        : `<p class="col-12 text-center text-muted">${t("results.empty.hint")}</p>`;
}

/**
 * gestion de localStorage pour les favoris : on stocke un tableau d'ids d'annonces
 */
const getFavoris = () => JSON.parse(localStorage.getItem("favoris") || "[]");

function toggleFavori(btn) {
    const id = Number(btn.dataset.id), liste = getFavoris();
    const maj = liste.includes(id) ? liste.filter(x => x !== id) : [...liste, id];
    localStorage.setItem("favoris", JSON.stringify(maj));
    btn.setAttribute("aria-pressed", maj.includes(id));
}

$("mResults").addEventListener("click", e => {
    const btn = e.target.closest(".fav");
    if (btn) toggleFavori(btn);
});


/** 
 * Une carte d'annonce 
 */
function creerCarte(i) {
    const en = document.documentElement.lang === "en";
    const date = new Date(i.date).toLocaleDateString(document.documentElement.lang);
    const src = i.photo ? "/uploads/" + i.photo : "../img/default-item.svg";
    return `
        <div class="col-6 col-md-3 col-lg-4" style="min-width: 230px; max-width:100%">
          <article class="tag-card" style="border-top-color:${esc(i.type_hex)}">
            <span class="badge-type" style="color:${esc(i.type_hex)}">${esc(en ? i.type_en : i.type_fr)}</span>
            <img class="card-photo mt-2" src="${esc(src)}" alt="${i.photo ? esc(i.title) : ""}" loading="lazy" onerror="this.onerror=null;this.src='../img/default-item.svg'">
            <h3 class="h5 mt-2">${esc(i.title)}</h3>
            <p class="mb-0">${esc(en ? i.category_en : i.category_fr)}<br>
            ${esc(i.place)}, ${esc(i.city)}<br>
            ${date} . <span class="dot_annonce" style="background:${esc(i.color_hex)}" aria-hidden="true"></span>${esc(en ? i.color_en : i.color_fr)}
            <span class="float-end">
                <button type="button" class="fav" data-id="${i.id}" aria-pressed="${getFavoris().includes(i.id)}"aria-label="${t("fav.label")} : ${esc(i.title)}"></button>
            </span>
            </p>
          </article>
        </div>`;
}


/** 
 * Boutons précédent / suivant (cachés s'il n'y a qu'une page) 
 */
function afficherPagination(page) {
    $("mFooter").classList.toggle("d-none", totalPages <= 1);
    $("pageInfo").textContent = page + " / " + totalPages;
    $("prev").disabled = page <= 1;
    $("next").disabled = page >= totalPages;
}

/** 
 * Point d'entrée : met à jour tout le contenu du pop-up 
 */
function afficherResultats({ items, page, total, totalPages: tp }) {
    pageCourante = page;
    totalPages = Math.max(tp, 1);
    afficherCompteur(total);
    afficherAnnonces(items);
    //afficherPagination(page);
}

/**
 * pop-up de recherche d'annonces selon les critères passés en query string
 * @param {*} req 
 * @param {*} res
 */
/* ---------- Recherche : pop-up de résultats ---------- */
const modalResultats = new bootstrap.Modal($("resultsModal"));
let pageCourante = 1, totalPages = 1;

async function searchItems(page = 1) {
    if (objetRecherche === -1) {
        afficherMessage("Veuillez sélectionner si vous avez perdu ou trouvé un objet.", "danger");
        return;
    }

    const motcle = document.getElementById("q").value;
    const ville = document.getElementById("villes").value;
    const categorie = document.getElementById("categorie").value;
    const couleur = document.getElementById("couleurs").value;
    
    if(!motcle && !ville && !categorie && !couleur) {
        afficherMessage("Veuillez saisir au moins un critère de recherche.", "danger");
        return;
    }
    
    const params = new URLSearchParams({ type_id: objetRecherche, page, limit: 9 });
    [["categorie", "category_id"], ["villes", "city_id"], ["couleurs", "color_id"], ["q", "q"]]
        .forEach(([id, cle]) => { const v = $(id).value.trim(); if (v) params.append(cle, v); });
    const url = API + "/items?" + params.toString();

    try {
        const data = await (await fetch(url)).json();
        afficherMessage(`Recherche effectuée avec succès. ${data.total} annonce(s) trouvée(s).`, "success");
        copierValeursRecherchees();
        afficherResultats(data);
        modalResultats.show();
    } catch (e) {
        console.error("Erreur recherche :", e);
        afficherMessage("Impossible de charger les annonces.", "danger");
    }
}

// Le formulaire ne recharge plus la page
$("categorie").closest("form").addEventListener("submit", e => {
    e.preventDefault();
    searchItems(1);
});
$("prev").addEventListener("click", () => searchItems(pageCourante - 1));
$("next").addEventListener("click", () => searchItems(pageCourante + 1));


/**
 * Cherche depuis le pop-up : recopie les critères dans la page principale et relance la recherche
 * (utile si l'utilisateur veut modifier les critères depuis le pop-up)
 */
function chercherDepuisPopup() {
    const type = document.querySelector('input[name="mType"]:checked');
    if (type) selectObjetRecherche(Number(type.value));
    $("categorie").value = $("mCat").value;
    $("villes").value = $("mCity").value;
    $("couleurs").value = $("mColor").value;
    $("q").value = $("mQ").value;
    searchItems();
}

// début du code fait par l'IA ------------------------------------------------------
/** ---------------------------------------------------------------------------------
 * Fond de photos qui défilent 
 *  Photos dans public/img/hero/ puis liste leurs noms ici.
 */
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
