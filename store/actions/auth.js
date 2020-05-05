import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () => {
    return{
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (tokenId , userId) => {
    return{
        type : actionTypes.AUTH_SUCCESS,
        tokenId : tokenId,
        userId : userId
    };
};

export const authFailed = (error) => {
    return{
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};

export const authLogout = () => {
    return{
        type : actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(authLogout());
        },expTime*1000); //setTomeout take milliSecond so we have to convert them into seconds
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
            dispatch(authSuccess(response.data.idToken , response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err.response.data.error));
        });
    };
};