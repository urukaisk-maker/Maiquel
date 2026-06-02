export function showMessage(selector, text, type = "ok") {
  const node = document.querySelector(selector);
  if (!node) return;
  node.textContent = text;
  node.className = `mensaje ${type}`;
}

export function clearMessage(selector) {
  const node = document.querySelector(selector);
  if (!node) return;
  node.textContent = "";
  node.className = "mensaje";
}

export function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
