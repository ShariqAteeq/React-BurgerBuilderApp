import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingre : null,
        Totalprice : 0
    }

    componentWillMount(){
        let queryParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let param of queryParams.entries()){ //The entries() method returns an Array Iterator object with key/value pairs.
            // ['salad' , '1']
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
            ingredients[param[0]] = +param[1]; //+ sign is used to convert in number
        }
    }
        this.setState({ingre:ingredients , Totalprice : price});
    }

    cancelhandler = () =>{
        this.props.history.goBack();
    }

    continueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){

    

        return(
            <div>
                <CheckoutSummary 
                ingredients = {this.state.ingre}
                checkoutCancelled = {this.cancelhandler}
                checkoutContinued = {this.continueHandler}
                 />
             <Route path = {this.props.match.path + '/contact-data'} 
                    render = {(props)=> <ContactData ingredients = {this.state.ingre} 
                                                    price = {this.state.Totalprice}
                                                    {...props} />} //here props are used to get history props
             />
            </div>
        );
    }
}

export default Checkout;