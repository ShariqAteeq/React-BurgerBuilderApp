import React , {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updatedObject , checkValidity} from '../../shared/utility';

class Auth extends Component{

    state = {
        controls : {
            Email : {
                elementType : 'input',
                elementConfig :{
                    type : 'email',
                    placeholder : 'Email Address',
                  //  required : true
                },
                value : '' ,
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            Password : {
                elementType : 'input',
                elementConfig :{
                    type : 'password',
                    placeholder : 'Password',
                  //  required : true
                },
                value : '' ,
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            },
            
        },
        isSignUp : true
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.Email.value , this.state.controls.Password.value , this.state.isSignUp);
    }

    inputHandler = (event , controlName) => {
        const updatedControls = updatedObject(this.state.controls , {
            [controlName] : updatedObject(this.state.controls[controlName] , {
                value : event.target.value,
                valid : checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched : true
            })
        });

        this.setState({controls : updatedControls});
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignUp : !prevState.isSignUp}
        });
    };

    componentDidMount(){
        console.log(this.props.setPath);
        if(!this.props.building && this.props.setPath !== '/'){
            this.props.OnSetPath();
            
        }
    }

    render(){

        let formElementArray = [];
        for(let key in this.state.controls){
            //here keys are email & password
            formElementArray.push({
                id : key,
                config : this.state.controls[key] //this store elementType,config & value
            });
        }

        let form = formElementArray.map(formElement => {
           return <Input 
                key = {formElement.id}
                inptype = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                inValid = {!formElement.config.valid}
                DDValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputHandler(event , formElement.id)}
            />
        });


        if(this.props.loading){
            form = <Spinner />;
        }

        let errorMsg = null;

        if(this.props.error){
            errorMsg = (
             <p>{this.props.error.message}</p>
            );
        }

        let isAuth = null;
        if(this.props.isAuth){
            isAuth = <Redirect to = {this.props.setPath} />;
        }

        return(
            <div className = {classes.Auth}>
                {isAuth}
                {errorMsg}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType = 'Success'>SUBMIT</Button>
                    <Button 
                    clicked = {this.switchAuthModeHandler}
                    btnType = 'Danger'>
                        SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                        </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.tokenId !== null,
        setPath : state.auth.setPath,
        building : state.burgerBuilder.building,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email,password , isSignUp) => dispatch(actions.auth(email,password , isSignUp)),
        onSetPath : () => dispatch(actions.setPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);