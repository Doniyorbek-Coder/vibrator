function vibrateSimple() {
  navigator.vibrate([100, 100, 200, 100, 200]);
}

function vibratePattern() {
  navigator.vibrate([100, 200, 200, 200, 500]);
}
document.getElementById("result").innerHTML =
  navigator.deviceMemory || "unknown";
var $status = document.getElementById("status");

if ("Notification" in window) {
  $status.innerText = Notification.permission;
}

function requestPermission() {
  if (!("Notification" in window)) {
    alert("Notification API not supported!");
    return;
  }

  Notification.requestPermission(function (result) {
    $status.innerText = result;
  });
}

function nonPersistentNotification() {
  if (!("Notification" in window)) {
    alert("Notification API not supported!");
    return;
  }

  try {
    var notification = new Notification("Hi there - non-persistent!");
  } catch (err) {
    alert("Notification API error: " + err);
  }
}

function persistentNotification() {
  if (!("Notification" in window) || !("ServiceWorkerRegistration" in window)) {
    alert("Persistent Notification API not supported!");
    return;
  }

  try {
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => reg.showNotification("Hi there - persistent!"))
      .catch((err) => alert("Service Worker registration error: " + err));
  } catch (err) {
    alert("Notification API error: " + err);
  }
}
