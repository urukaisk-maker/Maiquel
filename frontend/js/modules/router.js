export function go(path) {
  history.pushState({}, "", path);
  window.dispatchEvent(new Event("app:navigate"));
}

export function currentPath() {
  return window.location.pathname;
}
