import { FaHome, FaInfoCircle, FaConciergeBell, FaCog } from 'react-icons/fa';
import HomePage from '$/HomePage';
import AboutPage from '$/AboutPage';
import ServicesPage from '$/ServicesPage';
import Option1Page from '$/Option1Page';

export const routes = [
  {
    name: 'Inicio',
    path: '/',
    icon: FaHome,
    component: HomePage,
  },
  {
    name: 'Nosotros',
    path: '/about',
    icon: FaInfoCircle,
    component: AboutPage,
  },
  {
    name: 'Servicios',
    path: '/services',
    icon: FaConciergeBell,
    component: ServicesPage,
  },
];

export const options = [
  {
    name: 'Hallowwen 2022',
    path: '/Hallowwen2022',
    icon: FaCog,
    component: Option1Page,
  },
];
