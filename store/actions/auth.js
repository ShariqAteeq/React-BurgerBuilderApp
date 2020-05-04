import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () => {
    return{
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return{
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    };
};

export const authFailed = (error) => {
    return{
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};

export const auth = (email,password , isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9QtUHowA77ok7myaEYlhziobic7hOwQE';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9QtUHowA77ok7myaEYlhziobic7hOwQE';
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err));
        });
    };
};