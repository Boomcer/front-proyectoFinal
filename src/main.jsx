import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/general.css'
import './App.css'
//import HomeScreen from './views/HomeScreen.jsx'
import CarsProductApp from './components/CardsProductApp.jsx'

createRoot(document.getElementById('root')).render(
  
    <CarsProductApp/>

)
