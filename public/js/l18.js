// Traductions FR / EN. Pour ajouter une langue : ajouter un objet ici.
const I18N = {
  fr: {
    skip: "Aller au contenu",
    "nav.label": "Navigation principale", "nav.toggle": "Ouvrir le menu",
    "nav.search": "Rechercher", "nav.publish": "Publier", "nav.mine": "Mes objets", "nav.login": "Connexion", 
    "nav.mesfavoris": "Mes favoris",
    "nav.fav": "Mes favoris", "fav.kicker": "Tes coups de cœur", "fav.title": "Mes favoris",
    "fav.empty": "Tu n’as pas encore de favori.", "fav.empty.hint": "Appuie sur le cœur d’une annonce pour la retrouver ici.",
    "fav.back": "Chercher des objets", "results.error": "Impossible de charger les annonces. Réessaie.",

    "lang.label": "Choix de la langue",
    "hero.kicker": "Objets perdus et trouvés du campus",
    "hero.title": "Il est quelque part. On le retrouve ensemble.",
    "hero.sub": "Publie ce que tu as perdu ou trouvé. On s’occupe de rapprocher les deux.",
    "hero.note": "ça m’est déjà arrivé aussi !",
    "cta.lost": "J’ai perdu quelque chose", "cta.found": "J’ai trouvé quelque chose",
    "search.title": "Chercher un objet", 
    "search.q": "Mot-clé", 
    "search.ph": "clés, sac, carte…",
    "search.cat": "Catégorie", 
    "search.type": "Annonce", 
    "search.go": "Chercher",
    "search.ville": "Ville", 
    "search.couleur": "Couleur", 
    "search.couleur.ph": "Couleur",
    "search.all": "Toutes",
    "cat.all": "Toutes", "cat.keys": "Clés", "cat.bags": "Sacs", "cat.phone": "Téléphones", "cat.clothes": "Vêtements", "cat.docs": "Cartes et papiers",
    "type.all": "Perdus et trouvés", "type.lost": "Perdu", "type.found": "Trouvé",
    "recent.title": "Annonces récentes",
    "count.0": "Aucune annonce ne correspond.", "count.1": "1 annonce", "count.n": "{n} annonces",
    "card.place": "Lieu :", "card.date": "Date :", "card.color": "Couleur :", "card.view": "Voir l’annonce",
    "color.blue": "bleu", "color.black": "noir", "color.red": "rouge", "color.green": "vert", "color.grey": "gris", "color.brown": "marron",
    "steps.title": "Comment ça marche",
    "s1.t": "Tu publies", "s1.p": "Une photo, un lieu, une date : deux minutes suffisent.",
    "s2.t": "On rapproche", "s2.p": "L’appli te propose des annonces qui ressemblent à la tienne.",
    "s3.t": "Tu récupères", "s3.p": "Tu envoies une demande, la personne accepte, et c’est fait.",
    "pause.stop": "Pause des photos", "pause.play": "Relancer les photos",

    "login.title": "Connexion", "login.email": "Adresse e-mail", "login.password": "Mot de passe", "login.submit": "Se connecter",
    "login.error": "Adresse e-mail ou mot de passe incorrect.",
    "login.email.err": "Entre une adresse e-mail valide.",
    "login.pw.err": "Entre ton mot de passe.",
    "login.remember": "Se souvenir de moi",
    "login.forgot": "Mot de passe oublié ?",
    "login.noacc": "Pas encore de compte ?",
    "login.create": "Créer un compte",
    "login.go": "Se connecter",
    "login.pw": "Mot de passe",
    "login.show": "Afficher le mot de passe", "login.hide": "Masquer le mot de passe",
    "login.kicker": "Objets perdus et trouvés du campus", 
    "login.sub": "Publie ce que tu as perdu ou trouvé. On s’occupe de rapprocher les deux.",
    "login.note": "tes objets t’attendent !",
    "login.side": "Retrouve tes annonces et tes demandes en cours.",

    "reg.title": "Créer un compte", 
    "reg.nom": "Nom", 
    "reg.prenom": "Prénom", 
    "reg.email": "Adresse e-mail", 
    "reg.pw": "Mot de passe", 
    "reg.pw2": "Confirmer le mot de passe",
    "reg.go": "Créer un compte",
    "reg.have": "Tu as déjà un compte ?",
    "reg.kicker": "Objets perdus et trouvés du campus",
    "reg.side": "Retrouve tes annonces et tes demandes en cours.",
    "reg.note": "tes objets t’attendent !",
    "reg.required": "Ce champ est obligatoire.",
    "reg.pw.err": "Le mot de passe doit contenir au moins 6 caractères.",
    "reg.pw2.err": "Les deux mots de passe doivent être identiques.",
    "reg.pw.help": "Au moins 8 caractères, majuscules, minuscules et chiffres.",
    "reg.ok" : "Ton compte a été créé avec succès !",
    "reg.err.409" : "Cet e-mail est déjà utilisé.",
    "reg.err.server" : "Erreur côté serveur, réessaie plus tard.",

    "results.title" : "Résultats de la recherche",
    "results.none" : "Aucune annonce ne correspond à ta recherche.",
    "results.count" : "{n} annonce(s) trouvée(s).",
    "results.page" : "Page {page} sur {totalPages}.",
    "results.prev" : "Page précédente", "results.next" : "Page suivante",
    "results.view" : "Voir l’annonce",
    "results.back" : "Retour à la recherche",
    "results.empty": "Aucune annonce ne correspond à ta recherche.",
    "results.empty.hint": "Essaie de changer les critères de recherche.",

    "pager.prev": "Précédent", 
    "pager.next": "Suivant",

    footer: "Un projet d’étudiant, fait avec soin."
  },
  en: {
    skip: "Skip to content",
    "nav.label": "Main navigation", "nav.toggle": "Open menu",
    "nav.search": "Search", "nav.publish": "Post", "nav.mine": "My items", "nav.login": "Log in",
    "nav.mesfavoris": "My favorites",
    "nav.fav": "My favorites", "fav.kicker": "Your picks", "fav.title": "My favorites",
    "fav.empty": "You have no favorites yet.", "fav.empty.hint": "Tap the heart on a listing to find it here.",
    "fav.back": "Search for items", "results.error": "Could not load the listings. Please try again.",

    "lang.label": "Language",
    "hero.kicker": "Campus lost and found",
    "hero.title": "It’s out there. Let’s find it together.",
    "hero.sub": "Post what you lost or found. We’ll help match the two.",
    "hero.note": "it’s happened to me too!",
    "cta.lost": "I lost something", "cta.found": "I found something",
    
    "search.title": "Look for an item", 
    "search.q": "Keyword", 
    "search.ph": "keys, bag, card…",
    "search.ville": "City", 
    "search.couleur": "Color", 
    "search.couleur.ph": "Color",
    "search.all": "All",
    "search.cat": "Category", 
    "search.type": "Listing", 
    "search.go": "Search",

    "cat.all": "All", "cat.keys": "Keys", "cat.bags": "Bags", "cat.phone": "Phones", "cat.clothes": "Clothing", "cat.docs": "Cards and papers",
    "type.all": "Lost and found", "type.lost": "Lost", "type.found": "Found",
    "recent.title": "Recent listings",
    "count.0": "No listing matches.", "count.1": "1 listing", "count.n": "{n} listings",
    "card.place": "Place:", "card.date": "Date:", "card.color": "Color:", "card.view": "View listing",
    "color.blue": "blue", "color.black": "black", "color.red": "red", "color.green": "green", "color.grey": "grey", "color.brown": "brown",
    "steps.title": "How it works",
    "s1.t": "You post", "s1.p": "A photo, a place, a date: two minutes is enough.",
    "s2.t": "We match", "s2.p": "The app suggests listings that look like yours.",
    "s3.t": "You get it back", "s3.p": "You send a request, the person accepts, and it’s done.",
    "pause.stop": "Pause photos", "pause.play": "Play photos",

    "login.title": "Log in", "login.email": "Email address", "login.password": "Password", "login.submit": "Log in",
    "login.error": "Incorrect email address or password.",
    "login.email.err": "Enter a valid email address.",
    "login.pw.err": "Enter your password.",
    "login.remember": "Remember me",
    "login.forgot": "Forgot password?",
    "login.noacc": "Don’t have an account yet?",
    "login.create": "Create an account",
    "login.go": "Log in",
    "login.pw": "Password",
    "login.show": "Show password", "login.hide": "Hide password",
    "login.kicker": "Campus lost and found", 
    "login.sub": "Post what you lost or found. We’ll help match the two.",
    "login.note": "your items are waiting for you!",
    "login.side": "Find your listings and requests in progress.",

    "reg.title": "Create an account",
    "reg.nom": "Last name", 
    "reg.prenom": "First name", 
    "reg.email": "Email address", 
    "reg.pw": "Password", 
    "reg.pw2": "Confirm password",
    "reg.go": "Create account",
    "reg.have": "Already have an account?",
    "reg.kicker": "Campus lost and found",
    "reg.side": "Find your listings and requests in progress.",
    "reg.note": "your items are waiting for you!",
    "reg.required": "This field is required.",
    "reg.pw.err": "Password must be at least 6 characters long.",
    "reg.pw2.err": "Passwords must match.",
    "reg.pw.help": "At least 8 characters, uppercase, lowercase and numbers.",
    "reg.ok" : "Your account has been created successfully!",
    "reg.err.409" : "This email is already in use.",
    "reg.err.server" : "Server error, please try again later.",

    "results.title" : "Search results",
    "results.none" : "No listing matches your search.",
    "results.count" : "{n} listing(s) found.",
    "results.page" : "Page {page} of {totalPages}.",
    "results.prev" : "Previous page", "results.next" : "Next page",
    "results.view" : "View listing",
    "results.back" : "Back to search",
    "results.empty": "No listing matches your search.",
    "results.empty.hint": "Try changing your search criteria.",

    "pager.prev": "Previous", 
    "pager.next": "Next",

    footer: "A student project, made with care."
  }
};

let lang = "fr";
try { lang = localStorage.getItem("lang") || (navigator.language || "fr").slice(0, 2); } catch (e) {}
if (!I18N[lang]) lang = "en";

function t(key, vars) {
  let s = (I18N[lang] && I18N[lang][key]) || key;
  if (vars) for (const k in vars) s = s.replace("{" + k + "}", vars[k]);
  return s;
}

// Applique la langue à tous les éléments marqués data-i18n, data-i18n-ph, data-i18n-aria
function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
}

function setLang(l) {
    if (!I18N[l]) return;

    lang = l;
    try {
        localStorage.setItem("lang", l);
    } catch (e) {}

    applyI18n();
    //window.location.reload();
}

document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
        console.log("Langue cliquée :", button.dataset.lang);
        setLang(button.dataset.lang);
    });
});

applyI18n();