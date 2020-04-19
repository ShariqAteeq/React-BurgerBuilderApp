import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state = {
        order : [],
        loading : true
    }

    componentDidMount(){
        axios.get('/Orders.json')
        .then(res => {
            const fetchOrders = [];
            console.log(res.data);
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            this.setState({loading : false , order : fetchOrders});
        })
        .catch(err => {
            this.setState({loading : false});
        })
    }


    render(){
        return(
            <div>
                <h1 style = {{textAlign : 'center'}}>Orders</h1>
              {this.state.order.map(order => (
                 <Order ingredients = {order.Ingredients}
                          price = {order.TotalPrice}
                          key = {order.id} />
              ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders , axios);