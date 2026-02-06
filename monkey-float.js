// ================= FLOATING MONKEY CHAT =================

// Prevent double execution (SAFE WAY)
if (window.__MONKEY_CHAT_LOADED__) {
  console.warn("Monkey chat already loaded");
} else {
  window.__MONKEY_CHAT_LOADED__ = true;

  document.addEventListener("DOMContentLoaded", () => {
    const monkeyBtn = document.getElementById("monkey-float");
    const monkeyChat = document.getElementById("monkey-chat");

    if (!monkeyBtn || !monkeyChat) {
      console.warn("Monkey elements not found");
      return;
    }

    // ✅ ALWAYS start closed
    monkeyChat.style.display = "none";

    // ✅ TOGGLE on click
    monkeyBtn.addEventListener("click", () => {
      const isOpen = monkeyChat.style.display === "block";
      monkeyChat.style.display = isOpen ? "none" : "block";
    });

    // ---------------- BASIC CHAT UI ----------------
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatBody = document.getElementById("chatBody");

    if (!input || !sendBtn || !chatBody) {
      console.warn("Chat input elements missing");
      return;
    }

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      const userMsg = document.createElement("div");
      userMsg.className = "user-msg";
      userMsg.textContent = text;
      chatBody.appendChild(userMsg);

      input.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.textContent = "I’m here with you. Take a breath 🐵";
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 600);
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  });
}
