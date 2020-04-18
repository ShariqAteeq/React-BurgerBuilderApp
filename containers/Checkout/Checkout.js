import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component{

    state = {
        ingre : {
            salad : 1,
            meat : 1,
            bacon : 1,
            cheese : 2
        }
    }

    componentDidMount(){
        let queryParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for (let param of queryParams.entries()){ //The entries() method returns an Array Iterator object with key/value pairs.
            // ['salad' , '1']
            ingredients[param[0]] = +param[1]; //+ sign is used to convert in number
        }
        this.setState({ingre:ingredients});
    }

    cancelhandler = () =>{
        this.props.history.goBack();
    }

    continueHandler = () =>{
        this.props.history.replace('/checkout.contact-data');
    }

    render(){

    

        return(
            <div>
                <CheckoutSummary 
                ingredients = {this.state.ingre}
                checkoutCancelled = {this.cancelhandler}
                checkoutContinued = {this.continueHandler}
                 />
            </div>
        );
    }
}

export default Checkout;