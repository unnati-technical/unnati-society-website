import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 'default', 'theme-school', 'theme-ngo'
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('theme-school', 'theme-ngo');
    
    // Add the new theme class if it's not the default
    if (theme !== 'default') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
