// Applies the saved theme before first paint to avoid a flash.
// External file so the CSP can use script-src 'self' (no 'unsafe-inline').
try {
  var t = localStorage.getItem('theme');
  var dark = t === null ? true : JSON.parse(t);
  if (dark) document.documentElement.classList.add('dark');
  var s = document.createElement('style');
  s.textContent = dark
    ? 'body{background-color:#111111;background-image:linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#16213e 100%)}'
    : 'body{background-color:#ffffff;background-image:linear-gradient(135deg,#ffffff 0%,#f8f9fa 50%,#e8eef2 100%)}';
  document.head.appendChild(s);
} catch (e) {
  document.documentElement.classList.add('dark');
}
