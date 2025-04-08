import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';
import { Provider } from "react-redux";
import store from "./store";
import 'leaflet/dist/leaflet.css';


const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nueva versión disponible. ¿Actualizar?')) {
      updateSW();
    }
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
