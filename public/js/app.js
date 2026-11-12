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


// début du code fait par l'IA ------------------------------------------------------
// Données d'exemple : plus tard, elles viendront du serveur avec fetch("/api/items")
const COLORS = { blue: "#3b6ea5", black: "#222", red: "#b3382c", green: "#4c8a5a", grey: "#8a8f94", brown: "#7a5232" };
const CATS = ["keys", "bags", "phone", "clothes", "docs"];
const ITEMS = [
  { id: 1, type: "found", cat: "keys", color: "grey", place: "Bibliothèque", date: "2026-11-10", title: { fr: "Trousseau avec porte-clé en bois", en: "Key ring with a wooden tag" } },
  { id: 2, type: "lost", cat: "bags", color: "blue", place: "Restaurant universitaire", date: "2026-11-09", title: { fr: "Sac à dos bleu, cahier à spirale", en: "Blue backpack, spiral notebook" } },
  { id: 3, type: "found", cat: "phone", color: "black", place: "Amphi B", date: "2026-11-11", title: { fr: "Téléphone avec coque noire", en: "Phone with a black case" } },
  { id: 4, type: "lost", cat: "clothes", color: "green", place: "Arrêt de tram", date: "2026-11-08", title: { fr: "Écharpe en laine verte", en: "Green wool scarf" } },
  { id: 5, type: "found", cat: "docs", color: "brown", place: "Hall des sciences", date: "2026-11-12", title: { fr: "Portefeuille avec carte d’étudiant", en: "Wallet with a student card" } },
  { id: 6, type: "lost", cat: "keys", color: "red", place: "Parking sud", date: "2026-11-07", title: { fr: "Clé de voiture, étui rouge", en: "Car key, red case" } }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = id => document.getElementById(id);

function fillSelects() {
  const keepCat = $("cat").value, keepType = $("type").value;
  $("cat").innerHTML = `<option value="">${t("cat.all")}</option>` + CATS.map(c => `<option value="${c}">${t("cat." + c)}</option>`).join("");
  $("type").innerHTML = `<option value="">${t("type.all")}</option><option value="lost">${t("type.lost")}</option><option value="found">${t("type.found")}</option>`;
  $("cat").value = keepCat; $("type").value = keepType;
}

function render() {
  const q = $("q").value.trim().toLowerCase(), cat = $("cat").value, type = $("type").value;
  const fmt = new Intl.DateTimeFormat(document.documentElement.lang, { day: "numeric", month: "long" });
  const list = ITEMS.filter(i =>
    (!cat || i.cat === cat) && (!type || i.type === type) &&
    (!q || (i.title[document.documentElement.lang] + " " + i.place).toLowerCase().includes(q)));

  $("count").textContent = list.length === 0 ? t("count.0") : list.length === 1 ? t("count.1") : t("count.n", { n: list.length });
  $("results").innerHTML = list.map(i => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="tag-card ${i.type}" aria-labelledby="it${i.id}">
        <span class="badge-type badge-${i.type}">${t("type." + i.type)}</span>
        <h3 id="it${i.id}">${esc(i.title[document.documentElement.lang])}</h3>
        <dl>
          <dt>${t("card.place")}</dt><dd>${esc(i.place)}</dd>
          <dt>${t("card.date")}</dt><dd>${fmt.format(new Date(i.date))}</dd>
          <dt>${t("card.color")}</dt><dd><span class="dot" style="background:${COLORS[i.color]}" aria-hidden="true"></span>${t("color." + i.color)}</dd>
        </dl>
        <a class="btn btn-outline-ink btn-sm mt-3" href="#item-${i.id}">${t("card.view")}<span class="visually-hidden"> : ${esc(i.title[document.documentElement.lang])}</span></a>
      </article>
    </div>`).join("");
}

function refresh() { applyI18n(); fillSelects(); render(); }

document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => { setLang(b.dataset.lang); fillSelects(); render(); updatePause(); }));
$("form").addEventListener("submit", e => { e.preventDefault(); render(); });
["q", "cat", "type"].forEach(id => $(id).addEventListener("input", render));
/* ---- Fond de photos qui défilent ----
   Ajoute tes photos dans public/img/hero/ puis liste leurs noms ici.
   Exemple : const HERO_PHOTOS = ["img/hero/cles.jpg", "img/hero/sac.jpg"];
   Tant que la liste est vide, des cadres colorés s'affichent à la place. */
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
refresh();
updatePause();