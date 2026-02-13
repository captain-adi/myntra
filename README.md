# Myntra Clone Frontend

A modern, responsive e-commerce frontend inspired by Myntra, built with **React + TypeScript + Vite**. This project includes product browsing, authentication flows, wishlist, bag/checkout flow, address management, and payment selection UI.

---

## ✨ Features

- 🔐 Authentication (login/signup/logout + protected routes)
- 🏠 Home page with trending/categories/product sections
- 🛍️ Product listing and product detail pages
- ❤️ Wishlist page (protected)
- 👜 Bag/Cart management with quantity updates
- 📍 Address add/edit/delete flow during checkout
- 💳 Payment selection and place-order flow
- 🔔 Toast notifications for success/error feedback
- 🧭 Client-side routing with nested layouts
- ⚡ Fast data fetching and mutation handling

---

## 🧱 Tech Stack Used

### Core

- **React 19**
- **TypeScript**
- **Vite 7**

### State & Data

- **Redux Toolkit** + **React Redux** (global auth & bag state)
- **TanStack React Query** (server data fetching/mutations)
- **Axios** (API client)

### Routing & Forms

- **React Router DOM**
- **React Hook Form**

### UI & Styling

- **Tailwind CSS v4**
- **shadcn/ui primitives** (with Radix UI components)
- **Lucide React** icons
- **react-toastify** notifications
- **clsx + tailwind-merge + cva** utilities

### Tooling

- **ESLint 9**
- **TypeScript ESLint**
- **Vercel rewrite config** for SPA routing

---

## 📁 Project Structure

```text
myntra/
├── public/
│   └── Image/
├── src/
│   ├── api/                    # Axios configuration
│   ├── assets/                 # Static assets
│   ├── components/             # Reusable UI and feature components
│   │   ├── authProvider/
│   │   ├── categorySection/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── loadingDialog/
│   │   ├── productCard/
│   │   ├── profileDropdown/
│   │   ├── protectedRoute/
│   │   ├── skeletons/
│   │   ├── trending/
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/                  # Typed redux hooks + React Query hooks
│   ├── lib/                    # Shared utility helpers
│   ├── pages/                  # Route-level pages
│   │   ├── address/
│   │   ├── bag/
│   │   ├── category/
│   │   ├── home/
│   │   ├── login/
│   │   ├── notFound/
│   │   ├── payment/
│   │   ├── product/
│   │   ├── signup/
│   │   └── wishList/
│   ├── routes/                 # Route definitions
│   ├── store/                  # Redux store + slices/thunks
│   │   ├── auth/
│   │   └── bag/
│   ├── type/                   # Shared TypeScript types
│   ├── utils/                  # Utility functions/handlers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components.json             # shadcn/ui config
├── vercel.json                 # SPA rewrite for deployment
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### 1) Prerequisites

- Node.js **18+** (recommended latest LTS)
- npm (comes with Node)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env` file in the root:

```bash
VITE_BACKEND_URL=http://localhost:5000
```

> This value is used by Axios as: `${VITE_BACKEND_URL}/api`.

### 4) Start development server

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

---

## 📜 Available Scripts

- `npm run dev` – run app in development mode
- `npm run build` – type-check and create production build
- `npm run preview` – preview built app locally
- `npm run lint` – run ESLint

---

## 🔀 Main Routes

- `/` – Home
- `/login` – Login
- `/signup` – Signup
- `/category/:categoryname` – Category products
- `/category/:categoryname/product/:id` – Product detail
- `/wishlist` – Wishlist (protected)
- `/checkout/bag` – Bag (protected)
- `/checkout/address` – Address (protected)
- `/checkout/payment` – Payment (protected)

---

## 🧠 Architecture Notes

- **Redux Toolkit** handles app-wide client state (auth session, bag state).
- **React Query** handles asynchronous server state (fetching products/categories and mutations).
- **AuthProvider** checks login status and preloads products on app mount.
- **ProtectedRoute** ensures private pages are accessible only to authenticated users.

---

## 🌍 Deployment

This project includes `vercel.json` rewrite config so refreshing non-root routes works correctly on Vercel.

---

## 🤝 Contributing

1. Create a feature branch
2. Commit changes with clear messages
3. Run lint/build before pushing
4. Open a pull request

---

## 📄 License

This project is for educational and portfolio purposes.
