import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import store from './store/store';
import { Provider } from 'react-redux';
import { MyHistoryProvider } from './MyHistoryProvider';

function App() {
  return (
    <Provider store={store}>
      <MyHistoryProvider>
        <RouterProvider router={router} />
      </MyHistoryProvider>
    </Provider>
  );
}

export default App;
