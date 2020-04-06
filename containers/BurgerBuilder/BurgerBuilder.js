import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    };
   
    updatePurchasableState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]; //this return the value of ingredients
        }).reduce((sum,ele)=>{
            return sum+ele;     //this calculate sum of all ingredients
        },0);
        this.setState({purchasable : sum>0});
    }

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
            this.updatePurchasableState(updateIng);
    }

    LessIngredientsHandler = (type) =>{
            const oldCount = this.state.ingredients[type];
            const updateCount = oldCount-1;
            const updateIng = {
                ...this.state.ingredients
            }
            updateIng[type] = updateCount;
            const priceAdditon = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAdditon;
            this.setState({ingredients : updateIng, totalPrice : newPrice});
            this.updatePurchasableState(updateIng);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //diabled Info Contain {salad : true , meat : false} in term of their values
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <Modal show = {this.state.purchasing}>
                    <OrderSummary ingredients = {this.state.ingredients}></OrderSummary>
                </Modal>
                <BuildControls addIng = {this.MoreIngredientsHandler}
                               removeIng = {this.LessIngredientsHandler}
                               disabled = {disabledInfo}
                               price = {this.state.totalPrice}
                               purchasable = {this.state.purchasable}
                               ordered = {this.purchaseHandler}
                />
                
            </Aux>
        );
    }
}

export default BurgerBuilder;