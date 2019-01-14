import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
// import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './styles/style.css';

// to use bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// to use fonts
import './styles/fonts.css'

import ApiHost from './routes/api_host'
import configureStore from './redux-modules/create'

var initialState = "Gredu Indonesia"
initialState = window.DATA;
const client = new ApiHost();
const store = configureStore(client, initialState);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App initialData={window.DATA} />
      </BrowserRouter>
    </Provider>, document.getElementById('root')
  );
  registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
