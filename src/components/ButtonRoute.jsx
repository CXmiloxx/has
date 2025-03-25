
// eslint-disable-next-line no-unused-vars
import { motion} from 'framer-motion';
import {useLocation} from 'react-router-dom';
export default function ButtonRoute({ onclick, item, open }) {
  const location = useLocation();

  return (
    <motion.button
      className={`flex items-center p-3 w-full hover:bg-secondary-hover transition-colors ${
        location.pathname === item.path ? 'bg-secondary' : ''
      }`}
      onClick={onclick}
    >
      <item.icon size={20} className="mr-2" />
      {open && <span>{item.name}</span>}
    </motion.button>
  );
}
