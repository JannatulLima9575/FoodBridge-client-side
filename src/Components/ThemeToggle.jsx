// ThemeToggle.jsx
import localforage from 'localforage';
import { Moon, Sun } from 'lucide-react'; // optional icons
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await localforage.getItem('theme');
      const finalTheme = savedTheme || 'light';

      // Apply theme class
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(finalTheme);

      setDarkMode(finalTheme);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    console.log('tesjhfjksdhfdksfjsdkl');
    const newTheme = darkMode === 'dark' ? 'light' : 'dark';

    // Update DOM
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);

    setDarkMode(newTheme);
    await localforage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      title={`Switch to ${darkMode ? 'Light' : 'Dark'} mode`}
    >
      {darkMode ? (
        <Sun className="text-yellow-300 w-6 h-6" />
      ) : (
        <Moon className="text-gray-800 w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
