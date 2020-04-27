import * as actionTypes from './action';

const InitialState = {
    ingredients :{
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0
    },
    totalPrice : 4
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
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.IngName]

            };
        case actionTypes.REM_ING : 
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.IngName] : state.ingredients[action.IngName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.IngName]
            };
        default :
            return state;
    }
};

export default reducer;