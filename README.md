# OCRID-V3 Demo 🎯

This repository is an example implementation of the `fw-ocrid` component, developed with **Vite.js** and **TypeScript**.

> **📌 Important**: To use this component, you must correctly configure the license and token provided by **Finwave**.

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/finwave-es/ocrid-v3-demo.git
cd ocrid-v3-demo
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Set the license in the browser

In your application, make sure to define the license in the `window` object before using the component:

```ts
window.regulaLicense = {
  license: "YOUR_LICENSE_HERE"
};
```

### 4️⃣ Enter the access token

Before using the component, you need to enter the authentication token provided by **Finwave**.  
This can be done via an input field in the HTML:

```html
<input type="text" id="tokenInput" placeholder="Enter your token here" />
```

### 5️⃣ Start the development server

```sh
npm run dev
```

The application will be available at `http://localhost:5173/` (by default).

---

That's it! 🚀 You can now use **OCRID-V3** in your application. If you have any questions, contact **Finwave's** support team.
