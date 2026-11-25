// Page "Mes favoris" : les identifiants viennent du navigateur, les annonces de l'API
function afficherVide() {
    $("favResults").innerHTML = "";
    $("favCount").textContent = "";
    $("favEmpty").classList.remove("d-none");
}

function majCompteur() {
    const n = document.querySelectorAll("#favResults .fav").length;
    if (!n) return afficherVide();
    $("favCount").textContent = t(n === 1 ? "count.1" : "count.n", { n });
}

async function chargerFavoris() {
    const ids = getFavoris();
    console.log("Favoris :", ids);
    $("favEmpty").classList.add("d-none");
    if (!ids.length) return afficherVide();

    try {
        // une requête par favori, lancées en même temps ; on attend que toutes soient finies
        const reponses = await Promise.all(ids.map(id => fetch(`${API}/items/${id}`)));
        const items = await Promise.all(reponses.filter(r => r.ok).map(r => r.json()));
        $("favResults").innerHTML = items.map(creerCarte).join("");
        majCompteur();
    } catch (e) {
        console.error("Erreur favoris :", e);
        $("favCount").textContent = t("results.error");
    }
}

// Retirer un favori : cards.js a déjà mis la liste à jour, on retire la carte
document.addEventListener("click", e => {
    const btn = e.target.closest(".fav");
    if (btn && btn.getAttribute("aria-pressed") === "false") {
        btn.closest("#favResults > *").remove();
        majCompteur();
    }
});

document.addEventListener("langchange", chargerFavoris);
applyI18n();
chargerFavoris();