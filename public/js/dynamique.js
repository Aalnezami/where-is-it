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