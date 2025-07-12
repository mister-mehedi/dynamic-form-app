# dynamic-form-app
A modern, responsive, and high-performance web application that allows users to dynamically add, remove, and validate form fields.

➡️ [View Live Demo](https://dynamic-form-app-amber.vercel.app/)

> *Major Phases of Development!*

- `Fully Functional`: It meets all the requirements from the project PDF.

- `Performant & Scalable`: It's optimized to handle many fields without slowing down.

- `Well-Designed`: The UI is polished, modern, and user-friendly.

---
✨ **Features**
- **Dynamic Field Management**: Seamlessly add or remove input/select field pairs with a single click.

- **Real-time State Display**: A live table view shows the current state of the form data as you type.

- **Robust Validation**: All fields are required, with clear, user-friendly error messages displayed below each invalid field upon submission.

- **Performance Optimized**: Built for scale, the app uses React.memo and useCallback to prevent unnecessary re-renders, ensuring a smooth experience even with a large number of fields.

- **Polished UI/UX**: A clean and modern interface built with Tailwind CSS and DaisyUI, featuring a hero section, icons, and subtle animations for a better user experience.

- **Fully Responsive**: The layout is optimized for all screen sizes, from mobile phones to desktop monitors.

- **User-Friendly Notifications**: Uses non-blocking modals for success messages instead of disruptive browser alerts.
---
🛠️ **Tech Stack**
- **Framework**: React (v18+)

- **Build Tool**: Vite

- **Routing**: React Router DOM (v6+)

- **Styling**:

  - Tailwind CSS

  - DaisyUI (Component Library for Tailwind)

  - PostCSS & Autoprefixer

- **Deployment**: Vercel
---
📂 **Project Structure**</br></br>
The project follows a standard, feature-oriented structure to keep the codebase organized and maintainable.
```
dynamic-form-app/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable, small components (Navbar, Footer)
│   ├── pages/            # Page-level components (Home, ErrorPage)
│   ├── routes/           # Main layout components for routing (Root)
│   ├── index.css         # Global styles and Tailwind directives
│   └── main.jsx          # App entry point and router configuration
├── .gitignore
├── index.html            # Main HTML template
├── package.json
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

---
⚙️ **Configuration**
- <ins>tailwind.config.js</ins>: This file configures Tailwind CSS. It specifies the paths for content scanning (to generate the necessary utility classes).

- <ins>postcss.config.js</ins>: Configures PostCSS to use the Tailwind CSS and Autoprefixer plugins, which are necessary for processing the CSS.

- <ins>src/index.css</ins>: Contains the three main Tailwind directives (`@import "tailwindcss"`,
`@plugin "daisyui"`,`@import tailwindcss/preflight`, `@tailwind utilities`) and any custom global styles or animations.

- <ins>index.html</ins>: Enables the DaisyUI plugin with a default theme (`data-theme="light"`).

---
🧩 **Component & Routing Breakdown**</br></br>
**Routing (`src/main.jsx`)**\
The application uses React Router DOM for client-side routing.

- `/`: The main route that renders the `Root` layout.

  - **index route**: Renders the `Home` component by default within the `Root` layout.

- `*`: An `ErrorPage` is configured to catch any undefined routes or application errors.

**Components**
- `Root.jsx`: The main layout component. It includes the `Navbar` and `Footer` and an `<Outlet />` that renders the active page.

- `Navbar.jsx`: A simple, responsive navigation bar at the top of the page.

- `Footer.jsx`: A simple footer at the bottom of the page.

- `ErrorPage.jsx`: A user-friendly page displayed when a route is not found or an error occurs.

- `Home.jsx`: The core component of the application.

  - **State Management**: Uses `useState` for managing the array of form fields and validation errors.

  - **Logic**: Contains all handler functions (`handleAddField`, `handleRemoveField`, `handleChange`, `handleSubmit`) for the form's functionality.

  - **Child Component (`FormField`)**: The JSX for a single form row is extracted into a memoized `FormField` component to optimize performance.

  - **Icons**: Defines SVG icons as functional components for reusability.

---
⚡ **Performance Optimizations**</br></br>
To ensure the application remains fast and responsive even with a large number of dynamic fields, the following optimizations have been implemented:

1. **Component Memoization** (`React.memo`): The `FormField` component is wrapped in `React.memo`. This prevents a field from re-rendering unless its own props have changed, stopping the entire list from re-rendering on every keystroke.

2. **Function Memoization** (`useCallback`): The `handleRemoveField` and `handleChange` functions passed down as props to `FormField` are wrapped in the `useCallback` hook. This ensures that the functions themselves are not recreated on every render, which is a necessary condition for `React.memo` to work effectively.
