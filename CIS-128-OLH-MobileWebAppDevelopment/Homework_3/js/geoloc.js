var map = null;
var marker = null;

function initMap(lat, lng) {
  // Hide spinner, show map div
  document.getElementById("mapSpinner").style.display = "none";
  var mapEl = document.getElementById("map");
  mapEl.style.display = "block";

  if (map === null) {
    // Create map for the first time
    map = L.map("map").setView([lat, lng], 15);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add marker with hover tooltip
    marker = L.marker([lat, lng])
      .addTo(map)
      .bindTooltip("📍 You are here!", {
        permanent: false, // shows on hover
        direction: "top",
        offset: [0, -10],
        className: "you-are-here-tip",
      })
      .bindPopup(
        "<strong>📍 You are here!</strong><br>Lat: " +
          lat.toFixed(6) +
          "<br>Lng: " +
          lng.toFixed(6),
      );

    // Open popup immediately
    marker.openPopup();
  } else {
    // Map already exists — just move the marker and re-centre
    map.setView([lat, lng], 15);
    marker.setLatLng([lat, lng]);
    marker.openPopup();
  }
}

function getLocation() {
  var statusEl = document.getElementById("statusMsg");
  var latEl = document.getElementById("latValue");
  var lngEl = document.getElementById("lngValue");
  var accuracyEl = document.getElementById("accuracyNote");
  var addressBox = document.getElementById("addressBox");
  var addressEl = document.getElementById("addressValue");
  var btn = document.getElementById("locateBtn");
  var spinner = document.getElementById("mapSpinner");

  if (!navigator.geolocation) {
    statusEl.textContent = "⚠️ Your browser does not support Geolocation.";
    statusEl.style.color = "#dc3545";
    spinner.style.display = "none";
    return;
  }

  // Reset display
  statusEl.textContent = "⏳ Detecting your location…";
  statusEl.style.color = "#888";
  latEl.textContent = "…";
  lngEl.textContent = "…";
  accuracyEl.textContent = "";
  addressBox.style.display = "none";
  if (map === null) {
    spinner.style.display = "flex";
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var acc = Math.round(position.coords.accuracy);

      // Show coordinates
      latEl.textContent = lat.toFixed(6);
      lngEl.textContent = lng.toFixed(6);
      accuracyEl.textContent = "✅ Accuracy: approximately " + acc + " metres";
      statusEl.textContent = "📍 Location found! Looking up your address…";
      statusEl.style.color = "#3BCEAC";

      // Draw / update map
      initMap(lat, lng);

      // Show refresh button
      btn.style.display = "inline-block";

      // Reverse geocode
      fetch(
        "https://nominatim.openstreetmap.org/reverse?lat=" +
          lat +
          "&lon=" +
          lng +
          "&format=json",
        { headers: { "Accept-Language": "en" } },
      )
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (data && data.display_name) {
            addressEl.textContent = data.display_name;
            addressBox.style.display = "block";
            statusEl.textContent =
              "✅ Location and address detected successfully!";
          }
        })
        .catch(function () {
          addressEl.textContent = "Address lookup unavailable.";
          addressBox.style.display = "block";
        });
    },
    function (error) {
      spinner.style.display = "none";
      var msg = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg =
            "🚫 Permission denied. Please allow location access and refresh the page.";
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "📡 Location unavailable. Check your device settings.";
          break;
        case error.TIMEOUT:
          msg = "⏱️ Request timed out. Please refresh the page.";
          break;
        default:
          msg = "❓ An unknown error occurred.";
      }
      statusEl.textContent = msg;
      statusEl.style.color = "#dc3545";
      latEl.textContent = "—";
      lngEl.textContent = "—";
      btn.style.display = "inline-block";
      btn.textContent = "📡 Try Again";
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
  );
}

// ── Auto-run on page load ──
window.addEventListener("load", getLocation);
