(function () {
  var query = new URLSearchParams(location.search);
  var hash = new URLSearchParams(location.hash.replace(/^#/, ''));
  var failed = query.get('error') || hash.get('error') || query.get('error_code') || hash.get('error_code');
  // What Supabase appended goes to the app untouched; this page reads none of it.
  var target = 'lungli://auth-callback' + location.search + location.hash;
  // The one-time code does not stay in the address bar or the history.
  try { history.replaceState(null, '', location.pathname); } catch (e) {}

  if (failed) {
    document.getElementById('ok').hidden = true;
    document.getElementById('failed').hidden = false;
    return;
  }
  var type = query.get('type') || hash.get('type');
  if (type === 'recovery') {
    document.getElementById('title').textContent = 'Choose a new password';
    document.getElementById('lead').textContent = 'Open the Lungli app to set it.';
    document.getElementById('hint').textContent = 'Open this link on the phone that has Lungli.';
  } else if (type === 'signup' || type === 'email_change' || type === 'email') {
    document.getElementById('title').textContent = 'Your email is confirmed';
  }
  document.getElementById('open').href = target;
  // On a phone, try the app straight away; the button is there if the
  // browser asks first or the app is not installed.
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    setTimeout(function () { location.href = target; }, 400);
  }
})();
