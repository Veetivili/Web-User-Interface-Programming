import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,  Route, Routes} from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import './index.css'

import Nav from './routes/nav.jsx'
import FuelInput from './routes/fuelInput.jsx'
import FuelHistory from './routes/fuelHistory.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/input' element={<FuelInput />} />
          <Route path='/history' element={<FuelHistory />} />
        </Routes>
      </Provider>,
    </BrowserRouter>
  </React.StrictMode>
)
