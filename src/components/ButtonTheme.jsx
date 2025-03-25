// eslint-disable-next-line no-unused-vars
import { motion} from 'framer-motion';
import { FaSun, FaMoon} from 'react-icons/fa';


import { useTheme } from '#/ThemeContext';

export default function ButtonTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>
    </>
  );
}
