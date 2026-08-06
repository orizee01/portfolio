import React, { createContext, useContext, useEffect, useState } from 'react'

const THEME_KEY = 'portfolio-theme'
const ThemeContext = createContext(null)

function readStoredTheme() {
  if (typeof window === 'undefined') return 'dark'

  try {
    return localStorage.getItem(THEME_KEY) || 'dark'
  } catch (error) {
    return 'dark'
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)

    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (error) {
      // ignore storage issues
    }
  }, [theme])

  useEffect(() => {
    applyTheme(theme)
  }, [])

  function toggleTheme() {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
