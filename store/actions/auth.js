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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token' , response.data.idToken);
            localStorage.setItem('expirationDate' , expirationDate);
            localStorage.setItem('userId' , response.data.localId);
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

export const setPath = (path) => {
    return{
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    };
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
           const expirationDate = new Date(localStorage.getItem('expirationDate'));
           if(expirationDate <= new Date()){
               dispatch(authLogout());
           }else{
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token , userId));
              dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
           }
        }
    };
};