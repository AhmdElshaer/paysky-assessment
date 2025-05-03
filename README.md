### Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#technologies-used)
- [Installation](#installation)
- [Auth Credentials](#Auth-Credentials)
- [Project Structure](#project-structure)

### Modern E-commerce App

This project is a modern e-commerce application built using Next.js and integrated with the FakeStoreAPI. It focuses on providing a seamless shopping experience with enhanced features and a clean design.

### Features

- Authentication system with routes guard.
- Browse and search for products.
- Add, remove and control the shopping cart.
- Simulated checkout process using FakeStoreAPI.
- Responsive Design suitable for all device sizes.
- Built-in state management with Zustand.
- Efficient data fetching using Next.js API routes.

### Tech Stack

- **Frontend:** Next.js, React.js
- **Styling:** CSS Modules, tailwind css
- **State Management:** Zustand
- **API Client:** Fetch API
- **Backend Integration:** FakeStoreAPI
- **Other Technologies** React hook form, Shadcn UI

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmdElshaer/paysky-assessment.git

# Navigate to project directory
cd paysky-assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Auth Credentials

For login functionality, use:
- Username: `mor_2314`
- Password: `83r5^_`

### Project Structure

- `app` - Contains Next.js page components.
- `components` - Reusable UI components, including layout and UI elements.
- `hooks` - Custom React hooks for managing reusable logic.
- `lib` - Utility functions and API helpers, such as `api` and `utils`.
- `modules` - Feature-specific modules for encapsulating related functionality.
- `stores` - State management files using Zustand.
- `types` - TypeScript type definitions for ensuring type safety.

