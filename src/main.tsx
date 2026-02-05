import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import {store} from "./app/store.ts"; // <-- импорт твоего Redux store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen w-full bg-blue-950">
        <App />
      </div>
    </Provider>
  </StrictMode>,
);
