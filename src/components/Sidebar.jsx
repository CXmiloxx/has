/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { BiSolidParty } from 'react-icons/bi';
import { useState } from 'react';

import { routes, options } from '@router/routes';
import logo from '../assets/react.svg';
import ButtonTheme from './ButtonTheme';
import ButtonRoute from './ButtonRoute';

export default function Sidebar({ sideOpen, setSideOpen }) {
  const navigate = useNavigate();
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: sideOpen ? 240 : 60 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="h-screen dark:bg-gray-900 dark:text-white fixed left-0 top-0 shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <img src={logo} className="h-10 w-10" alt="Logo" />
        <motion.button
          onClick={() => setSideOpen(!sideOpen)}
          className="dark:text-white focus:outline-none"
        >
          <FaChevronDown className={`transform transition-transform ${sideOpen ? 'rotate-90' : 'rotate-270'}`} />
        </motion.button>
      </div>

      {/* Navigation Items */}
      <motion.ul className="mt-4  space-y-16 flex-1 overflow-hidden">
        {routes.map((item) => (
          <motion.li key={item.path} className="flex items-center">
            <ButtonRoute item={item} onclick={() => navigate(item.path)} open={sideOpen} />
          </motion.li>
        ))}

        {/* Dropdown */}
        <motion.li className="flex flex-col">
          <motion.button
            className="flex items-center justify-between p-3 w-full hover:bg-secondary-hover transition-colors"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <div className="flex items-center">
              <BiSolidParty size={20} className="mr-2" />
              {sideOpen && <span>Festividades</span>}
            </div>
            {sideOpen && (
              <FaChevronDown className={`transform transition-transform ${optionsOpen ? 'rotate-180' : ''}`} />
            )}
          </motion.button>

          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: optionsOpen ? 'auto' : 0, opacity: optionsOpen ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="mt-4 space-y-2 flex-1 overflow-hidden"
          >
            {options.map((item) => (
              <motion.li key={item.path}>
                <ButtonRoute item={item} onclick={() => navigate(item.path)} open={sideOpen} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.li>
      </motion.ul>

      {/* Theme Button */}
      <motion.div className="p-3 border-t border-gray-700">
        <ButtonTheme />
      </motion.div>
    </motion.div>
  );
}