import * as actionTypes from '../actions/actionType';

const InitialState = {
    orders : [],
    loading : false,
    purchased : false
}

const reducer = (state = InitialState , action) => {
    switch(action.type){
        case actionTypes.BURGER_INIT : 
            return{
                ...state,
                purchased : false
            };
        case actionTypes.START_BURGER : 
            return{
                ...state,
                loading : true
            };
        case actionTypes.BURGER_SUCCESS : 
            const newOrder = {
                ...action.orderData,
                orderId : action.OrderId
             }
            return{
                ...state,
                loading : false,
                purchased : true,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.BURGER_FAILED : 
            return{
                ...state,
                loading : false
            };
        default :
            return state;
    }
};

export default reducer;