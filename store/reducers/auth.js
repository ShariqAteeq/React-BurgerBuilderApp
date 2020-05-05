import * as actionTypes from '../actions/actionType';
import {updatedObject} from '../utility';

const InitialState = {
    userId : null,
    tokenId : null,
    error : null,
    loading : false
};

const authStart = (state) => {
    return updatedObject(state , {
        loading : true,
        error : null
    });
};

const authSuccess = (state,action) => {
    return updatedObject(state , {
        loading : false,
        tokenId : action.tokenId,
        userId  : action.userId,
        error : null
    });
};

const authFail = (state,action) => {
    return updatedObject(state , {
        loading : false,
        error : action.error
    });
};

const authLogout = (state,action) => {
    return updatedObject(state, {
        userId : null,
        tokenId : null
    });
};


const reducer = (state = InitialState , action ) => {

    switch(action.type){
        case actionTypes.AUTH_START :
            return authStart(state);
        case actionTypes.AUTH_SUCCESS :
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL :
            return authFail(state,action);
        case actionTypes.AUTH_LOGOUT :
            return authLogout(state,action);
        default:
            return state;
    }

};

export default reducer;