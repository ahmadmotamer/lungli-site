(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var isDark = function () {
    var chosen = root.getAttribute('data-theme');
    return chosen ? chosen === 'dark' : !!(media && media.matches);
  };
  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.theme-toggle');
    var sync = function () {
      for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', isDark() ? 'true' : 'false');
    };
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].hidden = false;
      buttons[i].addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        sync();
      });
    }
    sync();
    if (media && media.addEventListener) media.addEventListener('change', sync);
  });
})();
