import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/general.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx';
import { GlobalStateProvider } from '../src/context/GlobalStateContext.jsx'; // Importa el provider

createRoot(document.getElementById('root')).render(
    <GlobalStateProvider>
        <App />
    </GlobalStateProvider>
);
