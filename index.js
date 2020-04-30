import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import BurgerBuilder from './store/reducers/BurgerBuilder';
import {createStore , applyMiddleware , compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(BurgerBuilder, composeEnhancers(
        applyMiddleware(thunk)
));

const app = (
    <Provider store = {store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
