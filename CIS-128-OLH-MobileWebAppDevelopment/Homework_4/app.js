/* =====================================================
   PWA Explorer — app.js
   ===================================================== */

'use strict';

/* ---- Background images ---- */
const BG_IMAGES = {
  blue: './images/lightblue.jpg',   
  gold: './images/lightgold.jpg',   
  white: ''
};

/* ---- Apply background to <body> ---- */
function applyBackground(value) {
  const body = document.body;
  if (value === 'white' || !value) {
    body.style.backgroundImage = 'none';
    body.style.backgroundColor = '#ffffff';
  } else {
    const img = BG_IMAGES[value];
    if (img) {
      body.style.backgroundImage = `url('${img}')`;
      body.style.backgroundColor = '';
    }
  }
}

/* ---- Background Selector ---- */
const bgSelect  = document.getElementById('bgSelect');
const applyBtn  = document.getElementById('applyBtn');

// Apply immediately when user selects an option
bgSelect.addEventListener('change', function () {
  applyBackground(this.value);
});

// Apply button also triggers the change
applyBtn.addEventListener('click', function () {
  applyBackground(bgSelect.value);
});

/* ---- Local Storage: Name ---- */
const userNameInput = document.getElementById('userName');
const displayName   = document.getElementById('displayName');

// Load saved name on page load
(function loadName() {
  const saved = localStorage.getItem('name');
  if (saved) {
    displayName.textContent = saved;
    userNameInput.value = saved;
  }
})();

// Save / display name when user finishes typing
userNameInput.addEventListener('blur', function () {
  const typed = this.value.trim();
  if (!typed) return;

  // Only write to Local Storage if there is no existing 'name' key
  const existing = localStorage.getItem('name');
  if (!existing) {
    localStorage.setItem('name', typed);
  }

  // Always display whatever is in Local Storage
  const storedName = localStorage.getItem('name');
  displayName.textContent = storedName || typed;
});

// Also update live as user types 
userNameInput.addEventListener('input', function () {
  const typed = this.value.trim();
  if (typed) displayName.textContent = typed;
});

/* ---- Service Worker Registration ---- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then(function (registration) {
        console.log('[SW] Registered successfully. Scope:', registration.scope);
      })
      .catch(function (error) {
        console.error('[SW] Registration failed:', error);
      });
  });
}
