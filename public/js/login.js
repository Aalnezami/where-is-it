// Page de connexion : validation Bootstrap, bouton afficher/masquer, envoi au serveur
const $ = id => document.getElementById(id);

function updateToggle() {
  const shown = $("pw").type === "text";
  $("toggle").textContent = t(shown ? "login.hide" : "login.show");
  $("toggle").setAttribute("aria-pressed", String(shown));
}

$("toggle").addEventListener("click", () => {
  $("pw").type = $("pw").type === "password" ? "text" : "password";
  updateToggle();
});

$("form").addEventListener("submit", async e => {
  e.preventDefault();
  $("form").classList.add("was-validated");          // Bootstrap affiche les erreurs
  if (!$("form").checkValidity()) return;

  // À brancher à la phase 6 (authentification) : POST /api/login
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: $("email").value, password: $("pw").value, remember: $("remember").checked })
  }).catch(() => null);

  if (res && res.ok) location.href = "index.html";
  else { $("err").classList.remove("d-none"); $("err").focus(); }
});

document.addEventListener("langchange", updateToggle);
applyI18n();
updateToggle();