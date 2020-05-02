import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as Orderactions from '../../../store/actions/index'; 

class ContactData extends Component{
    
    state = {
        orderForm : {  
                Name : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Yout Name',
                      //  required : true
                    },
                    value : '' ,
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                Email : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'email',
                        placeholder : 'Yout E-Mail'
                    },
                    value : '' ,
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                Street : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value : '' ,
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                ZipCode : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'ZIP code'
                    },
                    value : '' ,
                    validation : {
                        required : true,
                        minLength : 5,
                        maxLength : 6
                    },
                    valid : false,
                    touched : false
                },
                Country : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value : '' ,
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                DeliveryMethod :{
                    elementType : 'select',
                    elementConfig :{
                        Options : [
                            {value : 'Fastest' , displayValue : 'Fastest'},
                            {value : 'Cheapest' , displayValue : 'Cheapest'}
                        ]
                    },
                    value : 'Fastest ' ,
                    validation : {},
                    valid : true
                }   
        },
        formIsValid : false
    }
    
    orderHandler = (event) =>{
            event.preventDefault();
            const formData = {};
            for(let key in this.state.orderForm){
                formData[key] = this.state.orderForm[key].value;
            }

        const order = {
            Ingredients : this.props.ings,
            TotalPrice : this.props.price,
            OrderData : formData
        }

        this.props.onOrder(order);

    }

    inputHandler = (event , inputKey) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...this.state.orderForm[inputKey]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
        updatedOrderForm[inputKey] = updatedFormElement;
        updatedFormElement.touched = true;

        let formValid = true;
        for(let key in updatedOrderForm){
            formValid = updatedOrderForm[key].valid && formValid
        }

        this.setState({orderForm: updatedOrderForm , formIsValid : formValid});

    }


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

    render(){

        let formElementArray = [];
        for(let key in this.state.orderForm){
            //here keys are name,email,street
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key] //this store elementType,config & value
            });
        }

        let form = (
            <form onSubmit = {this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input inptype = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value} 
                            key = {formElement.id} 
                            inValid = {!formElement.config.valid}
                            DDValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed = {(event) => this.inputHandler(event , formElement.id)}/>
                ))}
                <Button disabled = {!this.state.formIsValid} btnType = 'Success' >ORDER</Button>
               
            </form>
        ); 

        if(this.props.loading){
            form = <Spinner />;
        }

        return(
            <div className = {classes.ContactData}>
                 <h4>Enter Your Contact Data</h4>
                    {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onOrder : (order) => dispatch(Orderactions.purchaseBurger(order))
    };
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(ContactData , axios));