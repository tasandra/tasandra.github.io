function showResult(boxId, valId, value, type) {
  const box = document.getElementById(boxId);
  const val = document.getElementById(valId);
  box.style.display = "block";
  if (type === "bool") {
    val.innerHTML = value
      ? '<span class="result-true">✅ true</span> — this IS a mobile device'
      : '<span class="result-false">❌ false</span> — this is NOT a mobile device';
  } else if (type === "int") {
    val.innerHTML =
      '<span class="result-num">' +
      value +
      " px</span> — physical screen width of this device";
  } else if (type === "touch") {
    val.innerHTML = value
      ? '<span class="result-true">✅ true</span> — this device HAS a touchscreen'
      : '<span class="result-false">❌ false</span> — this device does NOT have a touchscreen';
  }
}

function testIsMobile() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
      navigator.userAgent,
    );
  showResult("result-is-mobile", "val-is-mobile", isMobile, "bool");
}

function testResolutionWidth() {
  showResult(
    "result-resolution-width",
    "val-resolution-width",
    window.screen.width,
    "int",
  );
}

function testIsTouchscreen() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  showResult("result-is-touchscreen", "val-is-touchscreen", isTouch, "touch");
}
