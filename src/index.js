import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './styles/style.css';
import ReactGA from 'react-ga';
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

ReactGA.initialize(process.env.ANALYTIC_CODE);
ReactGA.pageview(window.location.pathname + window.location.search);

let math_random = ''

let check_device_id = localStorage.getItem('Device-ID')

if (!check_device_id) {
  console.log("hit new")
  math_random = Math.random()
  localStorage.setItem('Device-ID', 'browser_' + math_random)

}
console.log(process.env.ANALYTIC_CODE,"url")


localStorage.setItem('App-ID', 'wt')
localStorage.setItem('Device-Type', 'browser')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App initialData={window.DATA} />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
  // registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
