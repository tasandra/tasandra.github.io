function getLocation() {
  const btn = document.getElementById("locateBtn");
  const latEl = document.getElementById("latValue");
  const lngEl = document.getElementById("lngValue");
  const statusEl = document.getElementById("statusMsg");
  const accuracyEl = document.getElementById("accuracyNote");
  const addressBox = document.getElementById("addressBox");
  const addressEl = document.getElementById("addressValue");

  // Check browser support
  if (!navigator.geolocation) {
    statusEl.textContent =
      "⚠️ Sorry, your browser does not support Geolocation.";
    statusEl.style.color = "#dc3545";
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.textContent = "⏳ Detecting...";
  statusEl.textContent = "Waiting for your browser permission…";
  statusEl.style.color = "#888";
  latEl.textContent = "…";
  lngEl.textContent = "…";
  accuracyEl.textContent = "";
  addressBox.style.display = "none";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const acc = Math.round(position.coords.accuracy);

      // Show coordinates
      latEl.textContent = lat.toFixed(6);
      lngEl.textContent = lng.toFixed(6);
      accuracyEl.textContent = "✅ Accuracy: approximately " + acc + " metres";
      statusEl.textContent = "Location found! Looking up your address…";
      statusEl.style.color = "#3BCEAC";

      // Reverse geocode with OpenStreetMap Nominatim (free, no API key needed)
      const url =
        "https://nominatim.openstreetmap.org/reverse?lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json";

      fetch(url, { headers: { "Accept-Language": "en" } })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data && data.display_name) {
            addressEl.textContent = data.display_name;
            addressBox.style.display = "block";
            statusEl.textContent =
              "📍 Location and address detected successfully!";
          } else {
            addressEl.textContent = "Address could not be determined.";
            addressBox.style.display = "block";
          }
        })
        .catch(function () {
          addressEl.textContent =
            "Could not reach address lookup service. Check your connection.";
          addressBox.style.display = "block";
        });

      btn.disabled = false;
      btn.textContent = "🔄 Refresh Location";
    },
    function (error) {
      let msg = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg =
            "🚫 Permission denied. Please allow location access in your browser settings and try again.";
          break;
        case error.POSITION_UNAVAILABLE:
          msg =
            "📡 Location information is unavailable. Check your device settings.";
          break;
        case error.TIMEOUT:
          msg = "⏱️ The request timed out. Please try again.";
          break;
        default:
          msg = "❓ An unknown error occurred.";
      }
      statusEl.textContent = msg;
      statusEl.style.color = "#dc3545";
      latEl.textContent = "—";
      lngEl.textContent = "—";
      btn.disabled = false;
      btn.textContent = "📡 Try Again";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
}
