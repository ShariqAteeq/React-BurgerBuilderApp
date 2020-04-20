import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    valid : false
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
                    valid : false
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
                    valid : false
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
                    valid : false
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
                    valid : false
                },
                DeliveryMethod :{
                    elementType : 'select',
                    elementConfig :{
                        Options : [
                            {value : 'Fastest' , displayValue : 'Fastest'},
                            {value : 'Cheapest' , displayValue : 'Cheapest'}
                        ]
                    },
                    value : '' 
                }   
        },
        loading : false
    }
    
    orderHandler = (event) =>{
            event.preventDefault();
            this.setState({loading : true});

            const formData = {};
            for(let key in this.state.orderForm){
                formData[key] = this.state.orderForm[key].value;
            }

        const order = {
            Ingredients : this.props.ingredients,
            TotalPrice : this.props.price,
            OrderData : formData
        }

        axios.post('Orders.json',order)
        .then(response => {
            this.setState({loading:false });
            this.props.history.push('/');
        })
        .catch(error =>{
            this.setState({loading:false })
        });
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
        this.setState({orderForm: updatedOrderForm});
        console.log(updatedOrderForm);
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
                            changed = {(event) => this.inputHandler(event , formElement.id)}/>
                ))}
                <Button btnType = 'Success' >ORDER</Button>
               
            </form>
        ); 

        if(this.state.loading){
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

export default ContactData;