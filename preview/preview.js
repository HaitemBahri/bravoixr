/* preview.js — showcase controls. Not part of the bravoixr system.
 * Wires the theme + EN/AR toggles and swaps bilingual specimen text.
 * The pre-paint apply of stored state lives in a small inline <head> snippet
 * on each page (so there is no flash); this file handles live interaction. */

(function () {
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }
  function currentLang() {
    return root.getAttribute('lang') || 'en';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('bravoixr-theme', theme);
    syncButtons();
  }

  function applyLang(lang) {
    if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    }
    localStorage.setItem('bravoixr-lang', lang);
    swapText(lang);
    syncButtons();
  }

  /* Bilingual specimens: elements carry data-en / data-ar. */
  function swapText(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var value = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value != null) el.textContent = value;
    });
  }

  function syncButtons() {
    var themeBtn = document.querySelector('[data-toggle="theme"]');
    var langBtn = document.querySelector('[data-toggle="lang"]');
    if (themeBtn) themeBtn.textContent = currentTheme() === 'dark' ? '☀ Light' : '☾ Dark';
    if (langBtn) langBtn.textContent = currentLang() === 'ar' ? 'EN' : 'ع';
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-toggle]');
    if (!el) return;
    if (el.getAttribute('data-toggle') === 'theme') {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    } else if (el.getAttribute('data-toggle') === 'lang') {
      applyLang(currentLang() === 'ar' ? 'en' : 'ar');
    }
  });

  /* On load the inline snippet has already set the root attributes;
   * sync the specimen text and button labels to match. */
  swapText(currentLang());
  syncButtons();
})();
