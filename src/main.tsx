import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './css/index.css'
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import it from './assets/lang/it.json';
import en from './assets/lang/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      it: {
        translation: it,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
