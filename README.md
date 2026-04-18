# CoinVerse

CoinVerse is a comprehensive cryptocurrency market data visualization and management platform. It allows users to track real-time market trends, manage their portfolios, and monitor specific coins through a personalized watchlist.

## 🚀 Features

- **Market Overview:** Real-time data for various cryptocurrencies including price, 24h change, and volume.
- **Interactive Dashboards:** Visual representation of market trends using advanced charting libraries.
- **Watchlist:** Add and track your favorite coins for quick access.
- **Portfolio Management:** Keep track of your crypto holdings and performance.
- **DexScan:** Explore decentralized exchange data.
- **Exchange Tracking:** Monitor top cryptocurrency exchanges.
- **Responsive Design:** Fully responsive layout optimized for both desktop and mobile devices.
- **Dark/Light Mode:** Toggle between light and dark themes for a personalized experience.
- **Authentication:** Secure login and account creation pages.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **UI Frameworks:** Material UI (MUI) v7, Tailwind CSS
- **State Management & Context:** React Context API
- **Charts:** Chart.js, Recharts
- **Routing:** React Router v7
- **API Calls:** Axios
- **Form Handling:** React Hook Form, Zod
- **Icons:** React Icons, Material Icons

## 📦 Project Structure

```text
src/
├── API/             # API service functions (e.g., CoinGecko integration)
├── Components/      # Reusable UI components
├── Context/         # React Context providers (Theme, App state)
├── Data/            # Static data or constants
├── Hooks/           # Custom React hooks
├── Layouts/         # Page layouts (Default, Dashboard)
├── Pages/           # Application pages (Home, Dashboard, Watchlist, etc.)
├── Suspense/        # Loading and fallback components
├── utils/           # Helper functions
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coin-verse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.

## 📄 License

This project is licensed under the MIT License.
