import * as actionTypes from '../actions/actionType';

const InitialState = {
    ingredients : null,
    totalPrice : 4,
    error : false,
    building : false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 1.1,
    cheese : 2,
    meat : 4.5
};

const reducer = (state = InitialState , action) => {
    switch(action.type){
        case actionTypes.ADD_ING :
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.IngName] : state.ingredients[action.IngName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.IngName],
                building : true

            };
        case actionTypes.REM_ING : 
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.IngName] : state.ingredients[action.IngName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.IngName],
                building : true
            };
        case actionTypes.SET_ING : 
            return{
                ...state,
                ingredients : {
                    salad : action.ingredients.salad,
                    bacon : action.ingredients.bacon,
                    cheese : action.ingredients.cheese,
                    meat : action.ingredients.meat
                    
                },
                totalPrice : 4,
                error : false,
                building : false
            };
        case actionTypes.FAILED_ING : 
            return{
                ...state,
                error : true  
            };
        default :
            return state;
    }
};

export default reducer;