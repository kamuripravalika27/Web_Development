# NovaFlow — Modern Creative Workspace Landing Page

A responsive, high-converting, and modern landing page built with **semantic HTML5**, **modern CSS (Custom Properties, Flexbox & CSS Grid)**, and **vanilla JavaScript**. 

This project was built as part of the **CodSoft Web Development Internship** landing page task.

---

## 🌟 Project Highlights & Requirements Coverage

The project satisfies and exceeds every core objective outlined in the task:

1. **Semantic Structure & Elements**:
   - Organized semantic hierarchy: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
   - Distinct, purposeful headers and footers.

2. **Columns, Sections & Arrangement**:
   - **Bento Grid Architecture** for the feature showcase (multi-column spans with responsive collapsing).
   - **Interactive Tabbed Section** organizing workflow tiers (Designers, Developers, Product Leads).
   - **4-Column Impact Metrics Grid** with live JavaScript counting animations.
   - **3-Tier Pricing Comparison Matrix** with highlight badges and feature check lists.
   - **3-Column Social Proof / Testimonials Grid**.

3. **Alignment, Padding & Visual Hierarchy**:
   - Consistent mathematical spacing scale (`--space-1` through `--space-24`).
   - Clean alignment with Flexbox (`align-items: center; justify-content: space-between`).
   - Symmetrical section padding and container constraints (`max-width: 1200px`).

4. **Curated Color Palette & Glassmorphism**:
   - **Primary Palette**: Deep Space Navy (`#0a0d14`), Electric Indigo (`#6366f1`), Cyan Neon (`#06b6d4`), and Purple Accent (`#a855f7`).
   - **Theme Engine**: Built-in Dark and Light mode toggle with `localStorage` memory and system theme detection.
   - Modern glassmorphism overlays (`backdrop-filter: blur()`), ambient glow orbs, and multi-layer shadows.

5. **Overlap Prevention & Fluid Responsiveness**:
   - **Strict Zero-Overlapping Guarantee**:
     - Modern CSS Grid using `repeat(auto-fit, minmax(...))` and explicit media query breakpoints (`1024px`, `@media (max-width: 768px)`, `@media (max-width: 480px)`).
     - Text overflow protection and fluid typography with `clamp()`.
     - Mobile hamburger navigation drawer with outside-click dismiss and smooth transitions.

6. **Interactive Micro-Interactions**:
   - Dark / Light mode toggle.
   - Monthly / Annual pricing switch with instant discount recalculation.
   - Tabbed view switcher for different personas.
   - Animated metrics counter on viewport scroll (`IntersectionObserver`).
   - Interactive FAQ accordion with ARIA accessibility.
   - Modal product walkthrough video preview.
   - Live newsletter / email signup validation with feedback alerts.
   - Floating scroll-to-top button.

---

## 📁 Project Structure

```text
Landing_page/
├── index.html       # Semantic HTML5 markup with accessible tags & SEO metadata
├── styles.css       # Custom CSS tokens, grid/flexbox layouts, light/dark themes
├── script.js        # Vanilla JS for theme toggle, tabs, accordion, modals & counters
└── README.md        # Documentation, architecture, and feature overview
```

---

## 🚀 How to Run the Project

1. **Directly in Browser**:
   - Double-click `index.html` or right-click and choose **"Open with Google Chrome"** (or any preferred browser).

2. **Using VS Code Live Server**:
   - Open this folder in VS Code.
   - Right-click `index.html` and select **"Open with Live Server"**.

3. **Using Local Python Server (Terminal)**:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your web browser.

---

## 🎨 Technologies Used

- **HTML5**: Semantic markup, accessible attributes (`aria-expanded`, `aria-selected`, `role="tab"`).
- **CSS3**: Custom Properties (Variables), Flexbox, CSS Grid, Media Queries, Glassmorphism.
- **JavaScript (ES6+)**: DOM manipulation, event listeners, `IntersectionObserver`, `localStorage`.
- **Google Fonts**: Plus Jakarta Sans & Space Grotesk.
- **Font Awesome 6**: Modern iconography.

