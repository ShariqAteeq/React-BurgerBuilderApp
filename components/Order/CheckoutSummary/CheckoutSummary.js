import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

    return(
        <div className = {classes.CheckoutSummary}>
            <h2>We Hope it tastes Well!!</h2>
            <div style = {{width : '100%', margin : 'auto'}}>
                <Burger ingredients = {props.ingredients} />
            </div>

            <Button btnType = 'Danger' clicked = {props.checkoutCancelled} >CANCEL</Button>
            <Button btnType = "Success" clicked = {props.checkoutContinued} >CONTINE</Button>

        </div>
    );

}

export default checkoutSummary;