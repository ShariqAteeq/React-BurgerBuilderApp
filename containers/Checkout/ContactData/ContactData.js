import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component{
    
    state = {
        name : "",
        email : "",
        address : {
            street : "",
            postal : ""
        },
        loading : false
    }
    
    orderHandler = (event) =>{
            event.preventDefault();
            this.setState({loading : true});

        const order = {
            Ingredients : this.props.ingredients,
            TotalPrice : this.props.price,
            Customer : {
                Name : "Shariq",
                Email : "Shariq@gmail.com",
                Address : {
                    Street : "street 123",
                    Country : "Pakistan"
                },
                DeliveryMethod : 'PayPal'
            }

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
                <input className = {classes.Input} type = 'text' name = 'name' placeholder = 'Your Name' />
                <input className = {classes.Input} type = 'email' name = 'email' placeholder = 'Your Mail' />
                <input className = {classes.Input} type = 'text' name = 'street' placeholder = 'Street' />
                <input className = {classes.Input} type = 'text' name = 'postal' placeholder = 'Postal Code' />
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