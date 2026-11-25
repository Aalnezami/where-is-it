// Fonctions partagées par plusieurs pages (accueil, favoris) : un seul endroit à maintenir
const API = "/api";
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- Favoris (stockés dans le navigateur pour l'instant) ---------- */
const getFavoris = () => JSON.parse(localStorage.getItem("favoris") || "[]");

function toggleFavori(btn) {
    const id = Number(btn.dataset.id), liste = getFavoris();
    const maj = liste.includes(id) ? liste.filter(x => x !== id) : [...liste, id];
    localStorage.setItem("favoris", JSON.stringify(maj));
    btn.setAttribute("aria-pressed", maj.includes(id));
}

// Un seul écouteur pour tous les cœurs, sur toutes les pages
document.addEventListener("click", e => {
    const btn = e.target.closest(".fav");
    if (btn) toggleFavori(btn);
});

/* ---------- Carte d'annonce ---------- */
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