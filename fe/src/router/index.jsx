import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../RootLayout';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Calendar from '../pages/Calendar';
import Day from '../pages/Day';
import Schedule from '../components/day/Schedule';
import Task from '../components/day/Task';
import Diary from '../components/day/Diary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/day/:date',
        element: <Day />,
        children: [
          {
            path: 'schedule',
            element: <Schedule />
          },
          {
            path: 'task',
            element: <Task />
          },
          {
            path: 'diary',
            element: <Diary />
          }
        ],
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
  
]);

export default router;
