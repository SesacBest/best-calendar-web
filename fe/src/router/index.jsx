import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../RootLayout';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Calendar from '../pages/Calendar';
import Day from '../pages/Day';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '/day',
    element: <Day />,
    children: [],
  },
]);

export default router;
