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

export const burgerStart = (orderData) => {
    return dispatch => {
        
        axios.post('Orders.json',orderData)
        .then(response => {
            console.log(response.data);
            dispatch(burgerSuccess(response.data , orderData));
        })
        .catch(error =>{
           dispatch(burgerFailed(error));
        });
    }
}