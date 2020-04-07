import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

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
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Do You Contine to Checkout ?</p>
            <Button btnType = {'Danger'} clicked = {props.purCancelled}>CANCEL</Button>
            <Button btnType = {'Success'} clicked = {props.purContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;