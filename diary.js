const openBtn = document.getElementById("openCompose");
const modal = document.getElementById("composeModal");
const submitBtn = document.getElementById("submitEntry");
const entries = document.getElementById("entriesContainer");

const editor = document.getElementById("editor");
const imageInput = document.getElementById("imageInput");

const dateEl = document.getElementById("composeDate");
const timeEl = document.getElementById("composeTime");

let privacy = "Public";
let editingCard = null;
let savedRange = null;

/* ================= OPEN COMPOSE ================= */
openBtn.onclick = () => {
  editingCard = null;
  modal.classList.remove("hidden");
  editor.innerHTML = "";
  document.getElementById("topicInput").value = "";

  const now = new Date();
  dateEl.textContent = now.toDateString();
  timeEl.textContent = now.toLocaleTimeString();
};

/* ================= SAVE CURSOR ================= */
editor.addEventListener("keyup", saveCursor);
editor.addEventListener("mouseup", saveCursor);

function saveCursor() {
  const sel = window.getSelection();
  if (sel.rangeCount > 0) savedRange = sel.getRangeAt(0);
}

/* ================= TOOLBAR ================= */
document.querySelectorAll(".toolbar button[data-cmd]").forEach(btn => {
  btn.onclick = () => {
    editor.focus();
    document.execCommand(btn.dataset.cmd);
    btn.classList.toggle("active");
  };
});

/* ================= IMAGE UPLOAD ================= */
document.getElementById("attachBtn").onclick = () => imageInput.click();

imageInput.onchange = () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  editor.appendChild(img);
  editor.focus();
};

/* ================= EMOJI ================= */
document.getElementById("emojiBtn").onclick = () => {
  document.getElementById("emojiPicker").classList.toggle("hidden");
};

document.getElementById("emojiPicker").onclick = e => {
  if (!savedRange || !e.target.textContent) return;

  editor.focus();
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(savedRange);

  const textNode = document.createTextNode(e.target.textContent);
  savedRange.insertNode(textNode);
  savedRange.setStartAfter(textNode);
  savedRange.collapse(true);
};

/* ================= PRIVACY ================= */
document.getElementById("publicBtn").onclick = () => togglePrivacy(true);
document.getElementById("privateBtn").onclick = () => togglePrivacy(false);

function togglePrivacy(isPublic) {
  privacy = isPublic ? "Public" : "Private";
  document.getElementById("publicBtn").classList.toggle("active", isPublic);
  document.getElementById("privateBtn").classList.toggle("active", !isPublic);
}

/* ================= SUBMIT ================= */
submitBtn.onclick = () => {
  const topicInput = document.getElementById("topicInput");
  const topic = topicInput.value.trim();
  const fullContentHTML = editor.innerHTML.trim();
  const previewText = editor.innerText.trim();

  if (!topic || !fullContentHTML) return;

  const now = new Date();
  const preview =
    previewText.length > 160
      ? previewText.slice(0, 160) + "…"
      : previewText;

  let card = editingCard || document.createElement("div");
  card.className = "entry-card";

  // store full content safely
  card.dataset.content = fullContentHTML;
  card.dataset.topic = topic;
  card.dataset.privacy = privacy;

  card.innerHTML = `
    <div class="entry-menu">⋯
      <div class="menu-options">
        <div class="edit">✏️ Edit</div>
        <div class="delete">🗑 Delete</div>
      </div>
    </div>

    <div class="entry-meta">
      ${now.toLocaleDateString()} · ${now.toLocaleTimeString()} · 
      ${privacy === "Public" ? "🔓 Public" : "🔒 Private"}
    </div>

    <div class="entry-title">${topic}</div>

    <div class="entry-preview">${preview}</div>
  `;

  /* ===== MENU LOGIC ===== */
  const menuBtn = card.querySelector(".entry-menu");
  const menu = card.querySelector(".menu-options");

  menuBtn.onclick = (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  document.addEventListener("click", () => {
    menu.style.display = "none";
  });

  /* DELETE */
  card.querySelector(".delete").onclick = () => {
    card.remove();
  };

  /* EDIT */
  card.querySelector(".edit").onclick = () => {
    editingCard = card;
    modal.classList.remove("hidden");
    topicInput.value = card.dataset.topic;
    editor.innerHTML = card.dataset.content;
  };

  if (!editingCard) {
    entries.prepend(card);
  }

  modal.classList.add("hidden");
};
