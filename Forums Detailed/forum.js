const params = new URLSearchParams(window.location.search);
const forumName = params.get("name") || "Forum";

const forumTitle = document.getElementById("forumTitle");
const forumDesc = document.getElementById("forumDesc");
const forumStats = document.getElementById("forumStats");

forumTitle.textContent = `m/${forumName}`;
forumDesc.textContent = "Community discussion space";
forumStats.textContent = "👥 Active members · 🟢 Online now";

const titleInput = document.getElementById("titleInput");
const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("postsContainer");

const STORAGE_KEY = `forum_posts_${forumName}`;
let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  return mins === 0 ? "just now" : `${mins} min ago`;
}

function renderPosts() {
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-meta">
        ${post.author} · <span data-time="${post.time}">${timeAgo(post.time)}</span>
      </div>

      <div>${post.body}</div>

      <div class="vote-row">
        <span class="vote-btn" onclick="vote(${index}, 1)">⬆</span>
        <span>${post.votes}</span>
        <span class="vote-btn" onclick="vote(${index}, -1)">⬇</span>
      </div>

      <div class="comment-box">
        <input placeholder="Add a comment..." 
          onkeydown="addComment(event, ${index})">
        ${post.comments.map(c => `<div class="comment">• ${c}</div>`).join("")}
      </div>
    `;

    postsContainer.appendChild(div);
  });
}

function vote(index, val) {
  posts[index].votes += val;
  save();
}

function addComment(e, index) {
  if (e.key === "Enter" && e.target.value.trim()) {
    posts[index].comments.push(e.target.value.trim());
    e.target.value = "";
    save();
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  renderPosts();
}

postBtn.onclick = () => {
  const title = titleInput.value.trim();
  const body = postInput.value.trim();

  if (!title || !body) return;

  posts.unshift({
    title,
    body,
    author: "You",
    time: Date.now(),
    votes: 0,
    comments: []
  });

  titleInput.value = "";
  postInput.value = "";
  save();
};

setInterval(() => {
  document.querySelectorAll("[data-time]").forEach(el => {
    el.textContent = timeAgo(Number(el.dataset.time));
  });
}, 60000);

renderPosts();
