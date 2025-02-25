import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './router';
import store from './store/store';
import { Provider } from 'react-redux';
import AuthProvider from './AuthProvider';
import RootLayout from './RootLayout';

function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}>
        <AuthProvider>
          <RootLayout /> {/* children으로 전달 */}
        </AuthProvider>
      </RouterProvider>
    </Provider>
    </>
  );
}

export default App;
