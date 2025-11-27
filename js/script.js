// ============================
// 1️⃣ Theme Toggle
// ============================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
themeToggle.addEventListener('click', () => {
  const t = body.getAttribute('data-theme');
  const next = t === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});
function updateThemeIcon(theme){ themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'; }

// ============================
// 2️⃣ Smooth scrolling
// ============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================
// 3️⃣ Intersection Observer (fade-in effects)
// ============================
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); }});
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// ============================
// 4️⃣ Contact Form
// ============================
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(this);
  const name = fd.get('name');
  const email = fd.get('email');
  const btn = this.querySelector('.submit-button');
  const original = btn.textContent;
  btn.textContent = 'Sending...'; btn.disabled = true;
  setTimeout(()=>{
    alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
    this.reset(); btn.textContent = original; btn.disabled = false;
  }, 1200);
});

// ============================
// 5️⃣ 🧠 AI Message Enhancer Feature
// ============================
const aiBtn = document.getElementById("aiEnhanceBtn");
const aiOptions = document.getElementById("aiOptions");
const messageBox = document.getElementById("message");

if (aiBtn && aiOptions && messageBox) {
  aiBtn.addEventListener("click", () => {
    aiOptions.classList.toggle("hidden");
  });

  aiOptions.addEventListener("click", (e) => {
    if (!e.target.classList.contains("ai-option")) return;
    const action = e.target.dataset.action;
    let text = messageBox.value.trim();

    if (!text) {
      alert("Please write a message first!");
      return;
    }

    switch (action) {
      case "professional":
        text = "Dear Recruiter, " + text.replace(/hi|hello/gi, "Greetings") + 
          " I hope this message finds you well.";
        break;
      case "friendly":
        text = "Hey there! 😊 " + text + " Hope you're doing great!";
        break;
      case "concise":
        text = text.split(" ").slice(0, 10).join(" ") + "...";
        break;
      case "grammar":
        text = text.replace(/\bi\b/g, "I").replace(/\bim\b/gi, "I'm").replace(/\bu\b/g, "you");
        break;
    }

    messageBox.value = text;
  });
}

// ============================
// 6️⃣ GitHub Projects Feature (final & clean)
// ============================
const githubUsername = "Shatha976";
const githubContainer = document.getElementById("github-container");
const githubStatus = document.getElementById("github-status");
const reloadBtn = document.getElementById("reload-github");

async function fetchGitHubRepos() {
  if (!githubContainer || !githubStatus) return;

  githubStatus.textContent = "Loading repositories...";
  githubContainer.innerHTML = "";
  try {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();

    if (data.length === 0) {
      githubStatus.textContent = "No repositories found.";
      return;
    }

    githubStatus.textContent = "";
    data.slice(0, 6).forEach((repo, index) => {
      const card = document.createElement("div");
      card.className = "github-card";
      card.style.animationDelay = `${index * 0.15}s`;
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
      `;
      githubContainer.appendChild(card);
    });
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    githubStatus.textContent = "⚠️ Error loading repositories. Please check your internet or GitHub username.";
  }
}

// Load once (since <script> is deferred)
fetchGitHubRepos();

// Reload button
if (reloadBtn) reloadBtn.addEventListener("click", fetchGitHubRepos);