import axios from '../../axios-orders';
import * as actionTypes from './actionType';

export const burgerSuccess = (id , orderData) => {
    return{
    type : actionTypes.BURGER_SUCCESS,
    OrderId : id,
    orderData : orderData
    };
};

export const burgerFailed = (error) => {
    return{
    type : actionTypes.BURGER_FAILED,
    error : error
    };
}

export const burgerStart = () => {
    return{
        type : actionTypes.START_BURGER
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
            dispatch(burgerStart());
        axios.post('/Orders.json',orderData)
        .then(response => {
            console.log(response.data);
            dispatch(burgerSuccess(response.data.name , orderData));
        })
        .catch(error =>{
           dispatch(burgerFailed(error));
        });
    }
}

export const BurgerInit = () => {
    return{
        type : actionTypes.BURGER_INIT
    }
}