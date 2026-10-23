import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AiPage from './pages/AiPage'
import ArticlesPage from './pages/ArticlesPage'
import MediumPage from './pages/MediumPage'
import CvPage from './pages/CvPage'
import UploadPage from './pages/UploadPage'
import MessagesPage from './pages/MessagesPage'
import AdminPage from './pages/AdminPage'
import './index.css'
import ErrorBoundary from './ErrorBoundary'
import { ThemeProvider } from './components/ThemeProvider'

const pathname = window.location.pathname || '/'

const Root = pathname === '/ai' || pathname === '/ai/'
  ? AiPage
  : pathname === '/articles' || pathname === '/articles/'
    ? ArticlesPage
    : pathname === '/medium' || pathname === '/medium/'
      ? MediumPage
      : pathname === '/cv' || pathname === '/cv/'
        ? CvPage
        : pathname === '/upload' || pathname === '/upload/'
          ? UploadPage
          : pathname === '/messages' || pathname === '/messages/'
            ? MessagesPage
            : pathname === '/admin' || pathname === '/admin/'
              ? AdminPage
              : App

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
)
