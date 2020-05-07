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

export const purchaseBurger = (orderData , token) => {
    return dispatch => {
            dispatch(burgerStart());
        axios.post('/Orders.json?auth='+token,orderData)
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

export const fetchOrderStart = () => {
    return{
        type : actionTypes.FETCH_ORDER_START
    }
};

export const fetchOrderSuccess = (orders) => {
    return{
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
};

export const fetchOrderFailed = (error) => {
    return{
        type : actionTypes.FETCH_ORDER_FAILED,
        error : error
        
    }
};

export const fetchOrders = (token , userId) => {
    return dispatch => {
        let queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        dispatch(fetchOrderStart());
        axios.get('/Orders.json'+queryParam)
        .then(res => {
            const fetchOrders = [];
            console.log(res.data);
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            console.log(fetchOrders);
           dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(err => {
           dispatch(fetchOrderFailed(err));
        });
    }
};