import React , {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
                    minLength : 4
                },
                valid : false,
                touched : false
            }
        }
    };

    checkValidity(value , rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid; //trim is used to remove whitespaces
        }

        if(rules.minLength){
            isValid =value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid =value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched : true
            }
        };

        this.setState({controls : updatedControls});
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

        return(
            <div className = {classes.Auth}>
                <form>
                    {form}
                    <Button btnType = 'Success'>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;