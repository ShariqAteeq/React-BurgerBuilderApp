import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 1.1,
    cheese : 2,
    meat : 4.5
};


class BurgerBuilder extends Component{

    state = {
        ingredients :null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading: false,
        errot : null
    };

    componentDidMount(){
        axios.get('https://burger-builder-app-849f0.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients : response.data});
        }).catch(error => {
            this.setState({error : true});
        });
    }
   
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

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        //alert("Do You Continue!");

        this.setState({loading : true});

        const order = {
            Ingredients : this.state.ingredients,
            TotalPrice : this.state.totalPrice,
            Customer : {
                Name : "Shariq",
                Email : "Shariq@gmail.com",
                Address : {
                    Street : "street 123",
                    Country : "Pakistan"
                },
                DeliveryMethod : 'PayPal'
            }

        }

        axios.post('Orders.json',order)
        .then(response => {
            this.setState({loading:false , purchasing : false})
        })
        .catch(error =>{
            this.setState({loading:false , purchasing : false})
        });

    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let ordersumry = null;
        let burger = this.state.error ? <p>Ingredients Can't Be Loaded </p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}></Burger>
                    <BuildControls addIng = {this.MoreIngredientsHandler}
                               removeIng = {this.LessIngredientsHandler}
                               disabled = {disabledInfo}
                               price = {this.state.totalPrice}
                               purchasable = {this.state.purchasable}
                               ordered = {this.purchaseHandler}
                />
                </Aux>
            );

            ordersumry =   <OrderSummary ingredients = {this.state.ingredients}
            purCancelled = {this.purchaseCancelHandler}
            purContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice}  />

        }
        if(this.state.loading){
            ordersumry = <Spinner />;
        }
        

        //diabled Info Contain {salad : true , meat : false} in term of their values
        return(
            <Aux>
                
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                 {ordersumry}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder , axios);