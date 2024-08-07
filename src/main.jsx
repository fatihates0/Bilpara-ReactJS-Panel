import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import GeneralRoute from './routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GeneralRoute />
      </BrowserRouter>
    </Provider>
    {
      /*<RouterProvider router={routes} />*/
    }
  </React.StrictMode>,
)
