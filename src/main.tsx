import { Provider } from 'react-redux';
import Store from './redux/store';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './app.tsx';
import { AuthProvider } from './authContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
)
