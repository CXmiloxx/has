import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {routes, options} from './routes';

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        {
            options.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))
        }
      </Routes>
    </BrowserRouter>
  );
}
