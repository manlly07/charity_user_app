import '@radix-ui/themes/styles.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import './index.css'
import { store } from './stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
