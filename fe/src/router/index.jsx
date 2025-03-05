import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../RootLayout';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Calendar from '../pages/Calendar';
import Day from '../pages/Day';
import Schedule from '../components/day/Schedule';
import Task from '../components/day/Task';
import Diary from '../components/day/Diary';
import ScheduleCreate from '../components/day/ScheduleCreate';
import TaskCreate from '../components/day/TaskCreate';
import DiaryCreate from '../components/day/DiaryCreate';
import KakaoRedirect from '../pages/KakaoRedirect';
import AuthProvider from '../AuthProvider';
import HistoryContainer from '../HistoryContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <HistoryContainer>
          <RootLayout />
        </HistoryContainer>
      </AuthProvider>
    ),
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
            path: 'schedule/create',
            element: <ScheduleCreate />,
          },
          {
            path: 'schedule',
            element: <Schedule />,
          },
          {
            path: 'task/create',
            element: <TaskCreate />,
          },
          {
            path: 'task',
            element: <Task />,
          },
          {
            path: 'diary/create',
            element: <DiaryCreate />,
          },
          {
            path: 'diary',
            element: <Diary />
          },
          {
            path: '*',
            element: <Navigate to="/calendar" />
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
  {
    path: '/login/oauth/callback/kakao',
    element: <KakaoRedirect />,
  },
]);

export default router;
