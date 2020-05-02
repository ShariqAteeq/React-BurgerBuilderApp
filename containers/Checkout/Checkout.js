import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{

    // state = {
    //     ingre : null,
    //     Totalprice : 0
    // }

    // componentWillMount(){
    //     let queryParams = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of queryParams.entries()){ //The entries() method returns an Array Iterator object with key/value pairs.
    //         // ['salad' , '1']
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else{
    //         ingredients[param[0]] = +param[1]; //+ sign is used to convert in number
    //     }
    // }
    //     this.setState({ingre:ingredients , Totalprice : price});
    // }

    cancelhandler = () =>{
        this.props.history.goBack();
    }

    continueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){

        let summary = <Redirect to = '/' />;
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to ='/' /> : null;
            summary = (
             <div>
                 {purchasedRedirect}
                    <CheckoutSummary 
                ingredients = {this.props.ings}
                checkoutCancelled = {this.cancelhandler}
                checkoutContinued = {this.continueHandler}
                 />
                 <Route path = {this.props.match.path + '/contact-data'} component = {ContactData} />
            </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);

/* <Route path = {this.props.match.path + '/contact-data'} 
                    render = {(props)=> <ContactData ingredients = {this.state.ingre} 
                                                    price = {this.state.Totalprice}
                                                    {...props} />} //here props are used to get history props
             /> */