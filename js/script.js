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
// 4️⃣ NEW - Unsplash API Integration (Task 2)
// ============================
const heroSection = document.getElementById('hero-section');
const refreshBgBtn = document.getElementById('refresh-bg-btn');

// Curated list of high-quality tech/coding Unsplash photo IDs
const unsplashPhotoIds = [
  'cvBBO4PzWPg', // Laptop on desk
  'iar-afB0QQw', // Code on screen
  'jLwVAUtLOAQ', // Workspace setup
  'QLqNalPe0RA', // Dark code editor
  'tZc3vjPCk-Q', // Multiple monitors
  'Nyvq2juw4_o', // Minimal workspace
  'ZV_64LdGoao', // Coffee and laptop
  'hGV2TfOh0ns', // Programming
  'Im7lZjxeLhg', // Macbook
  'XJXWbfSo2f0'  // Developer desk
];

let currentPhotoIndex = 0;

function loadUnsplashBackground() {
  try {
    // Get next photo ID from our curated list
    const photoId = unsplashPhotoIds[currentPhotoIndex % unsplashPhotoIds.length];
    currentPhotoIndex++;
    
    // Use direct Unsplash photo URL (more reliable than random)
    const imageUrl = `https://images.unsplash.com/photo-${photoId}?w=1920&q=80&fit=crop`;
    
    // Create a new image to preload it
    const img = new Image();
    img.onload = function() {
      heroSection.style.backgroundImage = `url(${imageUrl})`;
      console.log(`✅ Background image ${currentPhotoIndex} loaded successfully`);
    };
    img.onerror = function() {
      console.log('⚠️ Image failed to load, trying alternative method...');
      // Alternative: Use Unsplash Source with cache buster
      const altUrl = `https://source.unsplash.com/1920x1080/?technology,coding&sig=${Date.now()}`;
      heroSection.style.backgroundImage = `url(${altUrl})`;
    };
    img.src = imageUrl;
    
  } catch (error) {
    console.log('📸 Using default gradient background');
  }
}

// Load background on page load
if (heroSection) {
  // Initial load
  loadUnsplashBackground();
  
  // Refresh button to get new background
  if (refreshBgBtn) {
    refreshBgBtn.addEventListener('click', () => {
      refreshBgBtn.textContent = '🔄 Loading...';
      refreshBgBtn.disabled = true;
      
      // Load next image
      loadUnsplashBackground();
      
      // Reset button after short delay
      setTimeout(() => {
        refreshBgBtn.textContent = '🔄 Change Background';
        refreshBgBtn.disabled = false;
      }, 1000);
    });
  }
}

// ============================
// 5️⃣ NEW - Session Timer (Task 3)
// ============================
const sessionTimerDisplay = document.getElementById('session-timer');
let sessionStartTime = Date.now();

function updateSessionTimer() {
  const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  
  if (sessionTimerDisplay) {
    sessionTimerDisplay.textContent = 
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

// Update timer every second
setInterval(updateSessionTimer, 1000);

// ============================
// 6️⃣ NEW - Name Persistence & Greeting (Task 4)
// ============================
const nameModal = document.getElementById('name-modal');
const nameInput = document.getElementById('visitor-name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const skipNameBtn = document.getElementById('skip-name-btn');
const greetingTitle = document.getElementById('greeting-title');

// Check if visitor name exists in localStorage
const storedName = localStorage.getItem('visitorName');

if (storedName) {
  // If name exists, update greeting immediately
  updateGreeting(storedName);
} else {
  // Show modal after 2 seconds if no name stored
  setTimeout(() => {
    if (nameModal) {
      nameModal.classList.remove('hidden');
    }
  }, 2000);
}

// Save name button
if (saveNameBtn) {
  saveNameBtn.addEventListener('click', saveName);
}

// Allow Enter key to save name
if (nameInput) {
  nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveName();
    }
  });
}

// Skip button
if (skipNameBtn) {
  skipNameBtn.addEventListener('click', () => {
    if (nameModal) {
      nameModal.classList.add('hidden');
    }
  });
}

function saveName() {
  const name = nameInput.value.trim();
  
  if (name) {
    localStorage.setItem('visitorName', name);
    updateGreeting(name);
    
    if (nameModal) {
      nameModal.classList.add('hidden');
    }
    
    // Show success message
    showNotification(`Welcome, ${name}! Your name has been saved. 🎉`);
  } else {
    alert('Please enter your name!');
  }
}

function updateGreeting(name) {
  if (greetingTitle) {
    greetingTitle.textContent = `Hi, I'm Shatha! Welcome, ${name}!`;
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #1B3C53, #234C6A);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 3000;
    animation: slideInRight 0.5s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ============================
// 7️⃣ Contact Form
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
    const visitorName = localStorage.getItem('visitorName') || name;
    showNotification(`Thank you ${visitorName}! Your message has been received. I'll get back to you at ${email} soon!`);
    this.reset(); 
    btn.textContent = original; 
    btn.disabled = false;
  }, 1200);
});

// ============================
// 8️⃣ AI Message Enhancer Feature
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
    showNotification('✨ Message enhanced!');
  });
}

// ============================
// 9️⃣ GitHub Projects Feature
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
if (reloadBtn) {
  reloadBtn.addEventListener("click", () => {
    reloadBtn.textContent = '🔄 Loading...';
    fetchGitHubRepos();
    setTimeout(() => {
      reloadBtn.textContent = '🔄 Reload Projects';
    }, 1000);
  });
}

// ============================
// 🔟 Performance Monitoring (Task 5)
// ============================
// Log page load performance
window.addEventListener('load', () => {
  setTimeout(() => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
    
    // Optional: Display performance metrics to user
    if (pageLoadTime < 3000) {
      console.log('✅ Excellent performance!');
    } else if (pageLoadTime < 5000) {
      console.log('⚠️ Good performance, but could be optimized');
    } else {
      console.log('🐌 Performance needs improvement');
    }
  }, 0);
});