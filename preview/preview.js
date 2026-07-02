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
  }

  /* Bilingual specimens: elements carry data-en / data-ar.
   * Form controls swap their placeholder; everything else swaps text content. */
  function swapText(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var value = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
      else el.textContent = value;
    });
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
   * sync the specimen text to match. */
  swapText(currentLang());
})();
