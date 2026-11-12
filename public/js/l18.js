// Traductions FR / EN. Pour ajouter une langue : ajouter un objet ici.
const I18N = {
  fr: {
    skip: "Aller au contenu",
    "nav.label": "Navigation principale", "nav.toggle": "Ouvrir le menu",
    "nav.search": "Rechercher", "nav.publish": "Publier", "nav.mine": "Mes objets", "nav.login": "Connexion",
    "lang.label": "Choix de la langue",
    "hero.kicker": "Objets perdus et trouvés du campus",
    "hero.title": "Il est quelque part. On le retrouve ensemble.",
    "hero.sub": "Publie ce que tu as perdu ou trouvé. On s’occupe de rapprocher les deux.",
    "hero.note": "ça m’est déjà arrivé aussi !",
    "cta.lost": "J’ai perdu quelque chose", "cta.found": "J’ai trouvé quelque chose",
    "search.title": "Chercher un objet", "search.q": "Mot-clé", "search.ph": "clés, sac, carte…",
    "search.cat": "Catégorie", "search.type": "Annonce", "search.go": "Chercher",
    "cat.all": "Toutes", "cat.keys": "Clés", "cat.bags": "Sacs", "cat.phone": "Téléphones", "cat.clothes": "Vêtements", "cat.docs": "Cartes et papiers",
    "type.all": "Perdus et trouvés", "type.lost": "Perdu", "type.found": "Trouvé",
    "recent.title": "Annonces récentes",
    "count.0": "Aucune annonce ne correspond.", "count.1": "1 annonce", "count.n": "{n} annonces",
    "card.place": "Lieu :", "card.date": "Date :", "card.color": "Couleur :", "card.view": "Voir l’annonce",
    "color.blue": "bleu", "color.black": "noir", "color.red": "rouge", "color.green": "vert", "color.grey": "gris", "color.brown": "marron",
    "steps.title": "Comment ça marche",
    "s1.t": "Tu publies", "s1.p": "Une photo, un lieu, une date : deux minutes suffisent.",
    "s2.t": "On rapproche", "s2.p": "L’appli te propose les annonces qui ressemblent à la tienne.",
    "s3.t": "Tu récupères", "s3.p": "Tu envoies une demande, la personne accepte, et c’est réglé.",
    "pause.stop": "Pause des photos", "pause.play": "Relancer les photos",
    footer: "Un projet d’étudiant, fait avec soin."
  },
  en: {
    skip: "Skip to content",
    "nav.label": "Main navigation", "nav.toggle": "Open menu",
    "nav.search": "Search", "nav.publish": "Post", "nav.mine": "My items", "nav.login": "Log in",
    "lang.label": "Language",
    "hero.kicker": "Campus lost and found",
    "hero.title": "It’s out there. Let’s find it together.",
    "hero.sub": "Post what you lost or found. We’ll help match the two.",
    "hero.note": "it’s happened to me too!",
    "cta.lost": "I lost something", "cta.found": "I found something",
    "search.title": "Look for an item", "search.q": "Keyword", "search.ph": "keys, bag, card…",
    "search.cat": "Category", "search.type": "Listing", "search.go": "Search",
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
  lang = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  applyI18n();
}