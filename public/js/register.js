/**
 * Page de création de compte : validation Bootstrap, envoi à POST /api/users
 */
const $ = id => document.getElementById(id);

// Affiche un message traduit (le texte vient du dictionnaire, jamais du serveur)
function afficher(cle, type) {
  $("msg").className = `text-center alert alert-${type}`;
  $("msg").textContent = t(cle);
  $("msg").focus();
}

$("form").addEventListener("submit", async e => {
  e.preventDefault();
  // les deux mots de passe doivent être identiques
  $("pw2").setCustomValidity($("pw2").value === $("pw").value ? "" : "différents");
  $("form").classList.add("was-validated");
  if (!$("form").checkValidity()) return;

  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom: $("nom").value.trim(),
      prenom: $("prenom").value.trim(),
      email: $("email").value.trim(),
      password: $("pw").value
    })
  }).catch(() => null);

  if (res && res.status === 201) {
    afficher("reg.ok", "success");
    setTimeout(() => location.href = "login.html", 1500);
  } else {
    afficher(res && res.status === 409 ? "reg.err.409" : "reg.err.server", "danger");
  }
});

applyI18n();