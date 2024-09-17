import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css/animate.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import "../node_modules/noty/lib/noty.css";  
// import "../node_modules/noty/lib/themes/mint.css";
import "../node_modules/noty/lib/themes/bootstrap-v4.css"; 
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import transactionsReducer from './store/reducers/transactions'
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faEye } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faEye)
// import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   question: authReducer,
   user: userReducer,
   transactions: transactionsReducer
})

const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk)
));

// const rootReducer = 

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
