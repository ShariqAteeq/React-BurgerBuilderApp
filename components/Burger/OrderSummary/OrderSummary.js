import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {

    let ing = Object.keys(props.ingredients).map(igkey => {
        return (
            <li key = {igkey+1}>
                <span style = {{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}
            </li>
        );
    })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>You Selected Following Delicious Items</p>
            <ul>
                 {ing}
            </ul>
            
            <p>Do You Contine to Checkout ?</p>
        </Aux>
    );
}

export default orderSummary;