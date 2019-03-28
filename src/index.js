import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter,Router } from 'react-router-dom'
import './styles/style.css';
import ReactGA from 'react-ga';
// to use bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// to use fonts
import './styles/fonts.css'
import './styles/font-awesome/css/font-awesome.css'
import ApiHost from './routes/api_host'
import configureStore from './redux-modules/create'

import history from './views/global/browser-history';

var initialState = "Gredu Indonesia"
initialState = window.DATA;
const client = new ApiHost();
const store = configureStore(client, initialState);

ReactGA.initialize(process.env.ANALYTIC_CODE);
ReactGA.pageview(window.location.pathname + window.location.search);

let math_random = ''

let check_device_id = localStorage.getItem('Device-ID')

if (!check_device_id) {
  math_random = Math.random()
  localStorage.setItem('Device-ID', 'browser_' + math_random)

}


localStorage.setItem('App-ID', 'wt')
localStorage.setItem('Device-Type', 'browser')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Router history={history}>
      <App initialData={window.DATA} />
    </Router>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
  // registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
