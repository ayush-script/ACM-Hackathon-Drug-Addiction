const monkeyBtn = document.getElementById("monkey-float");
const monkeyChat = document.getElementById("monkey-chat");

if (monkeyBtn && monkeyChat) {
  monkeyBtn.addEventListener("click", () => {
    monkeyChat.style.display =
      monkeyChat.style.display === "block" ? "none" : "block";
  });
}


// CHAT UI
const input = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatBody = document.getElementById("chatBody");

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
chatBody.scrollTop = chatBody.scrollHeight;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);

  input.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.textContent = "I hear you. Tell me more 🐵";
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 600);
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
