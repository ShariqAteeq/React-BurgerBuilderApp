import * as actionTypes from './actionType';
import axios from '../../axios-orders';
export const addIng = (ingName) => {
    return{
        type : actionTypes.ADD_ING,
        IngName : ingName
    }
}

export const remIng = (ingName) => {
    return{
        type : actionTypes.REM_ING,
        IngName : ingName
    }
}

export const setIng = (ingredients) => {
    return{
        type : actionTypes.SET_ING,
        ingredients : ingredients
    };
}

export const FailedIng = () => {
    return{
        type: actionTypes.FAILED_ING
    }
}

export const initIng = () => {
    return dispatch => {
        axios.get('https://burger-builder-app-849f0.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIng(response.data));
        }).catch(error => {
            dispatch(FailedIng());
        });
    }
}