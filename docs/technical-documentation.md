# 📄 Technical Documentation – Portfolio Project (Assignment 2)

## 1. Overview
A personal portfolio website showcasing my skills, projects, and background as a Software Engineering student.  
It includes advanced features such as **AI message enhancement**, **dark/light theming**, and **GitHub API integration**.

---

## 2. Technologies Used
- **HTML5** – Structure and content layout  
- **CSS3** – Design, responsiveness, transitions  
- **JavaScript (ES6)** – Functionality, event handling, API requests  
- **GitHub API** – Dynamic repository display  
- **GitHub Pages** – Deployment  

---

## 3. Project Structure
```text
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md

```

## 4. Core Features
| Feature | Description |
|----------|--------------|
| **Theme Toggle** | Switch between light/dark mode using `localStorage`. |
| **Smooth Scrolling** | Smooth navigation across sections using scroll behavior API. |
| **Fade-in Animation** | Elements fade in on intersection observer trigger. |
| **AI Enhancer** | Provides tone/grammar improvements for the contact message. |
| **AI Preview Popup** | Allows the user to review AI suggestions before applying. |
| **GitHub API** | Fetches latest public repositories dynamically. |
| **Error Handling** | Alerts for invalid form input and API fetch errors. |

---

## 5. JavaScript Workflow
1. **Theme Management**  
   - Reads theme from `localStorage`.  
   - Updates DOM attribute and icon dynamically.

2. **AI Enhancement Logic**  
   - Detects user message content.  
   - Offers transformations: *friendly*, *professional*, *concise*, *grammar*.  
   - Displays confirmation modal to preview AI-generated output.

3. **GitHub Integration**  
   - Fetches repositories using GitHub’s REST API.  
   - Handles loading and error states.  
   - Dynamically renders project cards with fade-in animation.

---

## 6. Responsiveness
- CSS Grid & Flexbox adapt layout across screen sizes.  
- Typography uses `clamp()` for fluid scaling.  
- Navigation bar remains fixed and accessible.

---

## 7. Deployment
- Hosted on **GitHub Pages**.  
- Automatic updates upon commit to `main` branch.  
- Accessible at: [https://shatha976.github.io/assignment-2/](https://shatha976.github.io/assignment-2/)

---

## 8. Future Enhancements
- Integrate a **backend service** for real form submissions.  
- Add **AI-generated project summaries** from GitHub data.  
- Improve **accessibility (A11y)** and keyboard navigation.

---

## 9. Credits
Created by **Shatha Alharbi**  
Supervised as part of **SWE Assignment 2 (Portfolio Project)**  
AI tools used responsibly: ChatGPT & Claude.