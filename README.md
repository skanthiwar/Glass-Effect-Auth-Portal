# Glass-Effect-Auth-Portal ✨

A self-exploration project demonstrating a modern, responsive authentication system mock-up with a sleek **Glassmorphism** design. This project focuses on implementing robust **client-side validation** and **mock data persistence** using browser features.

---

## 🚀 Key Features

* **Modern UI/UX:** A visually striking **glass-effect** (glassmorphism) interface with dynamic ambient lighting controlled by a simulated dimmer switch.
* **Persistent Mock Database:** User registration data (Name, Email, Password) is stored in the browser's **`localStorage`**, ensuring credentials persist across page refreshes and browser sessions.
* **Strict Form Validation:** Implements strong validation rules for both registration and login:
    * **Email:** Strict format check (`user@domain.com`).
    * **Password:** Requires 8+ characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Symbol.
    * **Confirmation:** **"Confirm Password"** must match the primary password.
    * **Uniqueness:** Prevents registration with an already existing email.
* **Forgot Password Flow:** Includes a conceptual process that validates the user's email existence before simulating the sending of a reset link.
* **Responsive Design:** Optimized for seamless viewing and interaction on both mobile and desktop devices.

---

## 🌐 Live Demo

You can interact with the final version of the **Glass-Effect Auth Portal** directly in your browser without needing to clone the repository.

🔗 **VIEW LIVE PROJECT HERE:** **https://skanthiwar.github.io/Glass-Effect-Auth-Portal/**

---

## 🔧 Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Structure and Semantic Markup |
| **CSS3** | Styling, Glassmorphism effects, and responsiveness. Uses **CSS Variables** for light control. |
| **JavaScript (Vanilla)** | All authentication logic, form validation, UI toggles, and persistence using `localStorage`. |

---

## 📋 How to Run Locally

Since this project contains no server-side code or complex dependencies, it is incredibly easy to run!

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/skanthiwar/Glass-Effect-Auth-Portal.git](https://github.com/skanthiwar/Glass-Effect-Auth-Portal.git)
    ```
    *(The full link includes the live demo path, but this is the correct format for cloning.)*
2.  **Navigate to the Directory:**
    ```bash
    cd Glass-Effect-Auth-Portal
    ```
3.  **Open in Browser:**
    * Simply double-click the **`index.html`** file in your project folder.
    * (Alternatively: Right-click `index.html` and choose "Open with..." and select your browser.)

### Testing Credentials

1.  Click **"Register Here."**
2.  Create a new account with a complex password (e.g., `Testing@123`).
3.  Refresh the page—your account will still be available for login because the data is in your browser's local storage.

---

## 🤝 Contribution & License

This was a **self-exploration** project, but feedback and suggestions are always welcome!
