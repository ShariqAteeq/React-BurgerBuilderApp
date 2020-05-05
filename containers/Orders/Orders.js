import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
    }


    render(){

        let order = <Spinner />;
        if(!this.props.loading){
            order = (
            this.props.orders.map(order => (
                <Order ingredients = {order.Ingredients}
                         price = {order.TotalPrice}
                         key = {order.id} />
             )));
        }

        return(
            <div>
                <h1 style = {{textAlign : 'center'}}>Orders</h1>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.tokenId
    };
}


const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders : (token) => dispatch(actions.fetchOrders(token))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders , axios));