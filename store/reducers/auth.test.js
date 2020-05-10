import reducer from './auth';
import * as actions from '../actions/actionType';

describe('<AuthReducer /> ' , () => {
    it('should have initial state' , () => {
        expect(reducer(undefined , {})).toEqual({
            userId : null,
            tokenId : null,
            error : null,
            loading : false,
            setPath : '/'
        });
    });

    it('should have token when login' , ()=> {
        expect(reducer({
            userId : null,
            tokenId : null,
            error : null,
            loading : false,
            setPath : '/'
        }, {
            type : actions.AUTH_SUCCESS,
            tokenId : 'token',
            userId : 'userid'
        })).toEqual({
            userId : 'userid',
            tokenId : 'token',
            error : null,
            loading : false,
            setPath : '/'
        });
    });
});