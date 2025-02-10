import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'  // Import the Provider component
import store from './redux/Store/Store.js'  // Import the store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>  {/* Wrap the App component with the Provider component */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
