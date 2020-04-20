import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { element } from 'prop-types';

class ContactData extends Component{
    
    state = {
        orderForm : {  
                Name : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Yout Name'
                    },
                    value : '' 
                },
                Email : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'email',
                        placeholder : 'Yout E-Mail'
                    },
                    value : '' 
                },
                Street : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value : '' 
                },
                ZipCode : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'ZIP code'
                    },
                    value : '' 
                },
                Country : {
                    elementType : 'input',
                    elementConfig :{
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value : '' 
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

        const order = {
            Ingredients : this.props.ingredients,
            TotalPrice : this.props.price,
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

    render(){

        let form = (
            <form>
              
                <Input inptype = {'input'}type = 'text' name = 'name' placeholder = 'Your Name' />
                <Input inptype = {'input'} type = 'email' name = 'email' placeholder = 'Your Mail' />
                <Input inptype = {'input'}type = 'text' name = 'street' placeholder = 'Street' />
                <Input inptype = {'input'}type = 'text' name = 'postal' placeholder = 'Postal Code' />
                <Button btnType = 'Success' clicked = {this.orderHandler} >ORDER</Button>
               
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