import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 1.1,
    cheese : 2,
    meat : 4.5
};


class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 0,
            meat : 0,
            cheese : 0,
            bacon : 0 
        },
        totalPrice : 4
    };
   

    MoreIngredientsHandler = (type) =>{
            const oldCount = this.state.ingredients[type];
            const updateCount = oldCount+1;
            const updateIng = {
                ...this.state.ingredients
            }
            updateIng[type] = updateCount;
            const priceAdditon = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAdditon;
            this.setState({ingredients : updateIng, totalPrice : newPrice});
    }

    render(){
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <BuildControls addIng = {this.MoreIngredientsHandler}/>
                
            </Aux>
        );
    }
}

export default BurgerBuilder;