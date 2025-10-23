const token = localStorage.getItem("token");
const socket = io({
  auth: {
    token: token,
  },
});
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("chatmsg", message);
    messageInput.value = "";
  }
}
function sendNotification() {
  socket.emit("notification", "A new user has joined the chat");
}
socket.on("chatmsg", (msg) => {
  const item = document.createElement("li");
  if (typeof msg === "object" && msg.user) {
    item.textContent = `${msg.user}: ${msg.text}`;
  } else {
    item.textContent = msg;
  }
  document.getElementById("messages").appendChild(item);
});
socket.on("notification", (msg) => {
  const item = document.createElement("li");
  item.textContent = "Notification: " + msg;
  document.getElementById("messages").appendChild(item);
});
socket.on("connect", () => {
  console.log("Connected to server");
  sendNotification();
});
socket.on("connection_error", (err) => {
  if (err.message === "Token expired") {
    fetch("/refresh-token", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        socket.auth.token = data.token;
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
      });
  } else {
    console.error("Connection error:", err.message);
  }
});
