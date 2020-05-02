import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import BurgerBuilderReducer from './store/reducers/BurgerBuilder';
import OrderReducer from './store/reducers/order';
import {createStore , applyMiddleware , compose , combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder : BurgerBuilderReducer,
    order : OrderReducer
});

const store = createStore(rootReducer, composeEnhancers(
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
