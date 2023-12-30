import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Filtersprovider } from './context/filters.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Filtersprovider>
    <App />
  </Filtersprovider>
)
