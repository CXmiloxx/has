/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaSignOutAlt, FaTimes, FaChevronDown } from 'react-icons/fa';
import { BiSolidParty } from 'react-icons/bi';

import { routes, options } from '@router/routes';
import logo from '../assets/react.svg';
import ButtonTheme from './ButtonTheme';
import ButtonRoute from './ButtonRoute';
import { useState } from 'react';

export default function Sidebar({ sideOpen, setSideOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleSidebar = () => {
    setSideOpen(!sideOpen);
  };

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: sideOpen ? 240 : 60 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen dark:bg-gray-900 dark:text-white fixed left-0 top-0 transition-all shadow-2xl"
    >
      <div className="flex items-center justify-between p-1">
        <img src={logo} className="h-10 w-10" alt="Logo" />
        <motion.button
          onClick={toggleSidebar}
          className="dark:text-white focus:outline-none"
        >
          {sideOpen ? (
            <FaChevronDown
              className="transform transition-transform
                optionsOpen rotate-90"
            />
          ) : (
            <FaChevronDown
              className="transform transition-transform
                optionsOpen rotate-280"
            />
          )}
        </motion.button>
      </div>

      <motion.ul className="mt-4 space-y-2">
        {routes.map((item) => (
          <motion.li key={item.path} className="flex items-center">
            <ButtonRoute
              item={item}
              onclick={() => navigate(item.path)}
              open={sideOpen}
            />
          </motion.li>
        ))}

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
              <FaChevronDown
                className={`transform transition-transform ${
                  optionsOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </motion.button>

          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: optionsOpen ? 'auto' : 0,
              opacity: optionsOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-bg rounded-md"
          >
            {options.map((item) => (
              <motion.li key={item.path}>
                <motion.button
                  className={`flex items-center p-3 w-full hover:bg-secondary-hover transition-colors ${
                    location.pathname === item.path ? 'bg-bg' : ''
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setOptionsOpen(false);
                  }}
                >
                  <item.icon size={20} className="mr-2" />
                  {sideOpen && <span>{item.name}</span>}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.li>
      </motion.ul>

      {/* Botón de Tema */}
      <motion.div className="mt-2 p-1">
        <ButtonTheme />
      </motion.div>
    </motion.div>
  );
}
