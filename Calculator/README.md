# Modern Interactive Calculator (HTML, CSS & JavaScript)

A modern, responsive, and interactive calculator web application built with **HTML5**, **CSS3 (CSS Grid & Custom Properties)**, and **Vanilla JavaScript**.

---

## 📸 Preview & Highlights

- **Modern Glassmorphic UI:** Smooth gradients, subtle shadows, and responsive layout.
- **CSS Grid System:** 4-column dynamic grid layout for consistent button spacing and alignment.
- **Dual Display Screen:** Shows the current input/result as well as the previous operand and selected operator.
- **Dark / Light Theme:** Toggle between sleek dark mode and clean light mode with saved preferences (`localStorage`).
- **Full Keyboard Support:** Use your physical keyboard for quick calculations.
- **Robust Math Engine:** Prevents division by zero, avoids floating-point precision errors (e.g., `0.1 + 0.2`), and prevents multiple decimals.

---

## 🛠️ Requirements & Technical Implementation

| Requirement | Implementation Detail |
| :--- | :--- |
| **Interactive Interface** | Clickable buttons with tactile feedback animations (`:active` and `.active-key`), dual-screen display, and theme switcher. |
| **Basic Arithmetic Operations** | Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`), plus Percentage (`%`) and Sign Toggle (`±`). |
| **Display Screen** | Two tiers: `#previous-operand` for formula history and `#current-operand` with dynamic font scaling and digit grouping. |
| **CSS Grid System** | Implemented in `style.css` via `display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;`. |
| **Event Listeners** | `button.addEventListener('click', ...)` attached to all buttons and `window.addEventListener('keydown', ...)` for physical keyboard typing. |
| **Loops** | Utilized `buttons.forEach((button) => { ... })` to traverse all calculator keys and bind interactions cleanly. |
| **If-Else Statements** | Used in `calculate()`, `appendNumber()`, and event routing to process different operations, handle edge cases, and validate decimal inputs. |
| **Operators** | Arithmetic (`+`, `-`, `*`, `/`, `%`), unary negation (`-`), comparison (`===`, `!==`, `>`, `<`), and logical operators (`&&`, `||`). |

---

## 📂 Project Structure

```
Calculator/
│
├── index.html       # Semantic HTML layout and button definitions
├── style.css        # CSS Grid layout, theme variables, and styling
├── script.js        # Calculator logic, loops, conditionals, & event listeners
└── README.md        # Documentation and usage guide
```

---

## 🚀 How to Run the Calculator

1. **Directly in Browser:**
   - Double-click `index.html` or right-click and choose **Open with > Google Chrome** (or any modern web browser).
2. **Using VS Code Live Server (Optional):**
   - Open this folder in VS Code.
   - Right-click `index.html` and click **"Open with Live Server"**.

---

## ⌨️ Keyboard Shortcuts

| Key | Calculator Function |
| :--- | :--- |
| `0` – `9` | Enter numbers |
| `.` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` or `x` | Multiplication |
| `/` | Division |
| `%` | Percentage |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last digit (DEL) |
| `Escape` or `Delete` | Clear all (AC) |

