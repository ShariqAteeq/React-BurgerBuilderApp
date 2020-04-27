import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';
import {connect} from 'react-redux';




class BurgerBuilder extends Component{

    state = {
        purchasing : false,
        loading: false,
        errot : null
    };

    componentDidMount(){
        // axios.get('https://burger-builder-app-849f0.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({ingredients : response.data});
        // }).catch(error => {
        //     this.setState({error : true});
        // });
    }
   
    updatePurchasableState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]; //this return the value of ingredients
        }).reduce((sum,ele)=>{
            return sum+ele;     //this calculate sum of all ingredients
        },0);
         return sum>0;
    }

    // MoreIngredientsHandler = (type) =>{
    //         const oldCount = this.state.ingredients[type];
    //         const updateCount = oldCount+1;
    //         const updateIng = {
    //             ...this.state.ingredients
    //         }
    //         updateIng[type] = updateCount;
    //         const priceAdditon = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice + priceAdditon;
    //         this.setState({ingredients : updateIng, totalPrice : newPrice});
    //         this.updatePurchasableState(updateIng);
    // }

    // LessIngredientsHandler = (type) =>{
    //         const oldCount = this.state.ingredients[type];
    //         const updateCount = oldCount-1;
    //         const updateIng = {
    //             ...this.state.ingredients
    //         }
    //         updateIng[type] = updateCount;
    //         const priceAdditon = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - priceAdditon;
    //         this.setState({ingredients : updateIng, totalPrice : newPrice});
    //         this.updatePurchasableState(updateIng);
    // }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        //alert("Do You Continue!");

        // let queryIng = [];
        // for(let i in this.props.ings){
        //     queryIng.push(encodeURI(i) + '=' + encodeURI(this.props.ings[i]))
        //     queryIng.push('price='+this.props.price)
        // }
        // const qureyString = queryIng.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search: '?' + qureyString
        // });
    
        this.props.history.push('/checkout');
    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let ordersumry = null;
        let burger = this.state.error ? <p>Ingredients Can't Be Loaded </p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}></Burger>
                    <BuildControls addIng = {this.props.onIngAdded}
                               removeIng = {this.props.onIngRemoved}
                               disabled = {disabledInfo}
                               price = {this.props.price}
                               purchasable = {this.updatePurchasableState(this.props.ings)}
                               ordered = {this.purchaseHandler}
                />
                </Aux>
            );

            ordersumry =   <OrderSummary ingredients = {this.props.ings}
            purCancelled = {this.purchaseCancelHandler}
            purContinued = {this.purchaseContinueHandler}
            price = {this.props.price}  />

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

const mapStateToProps =  state => {
    return{
        ings : state.ingredients,
        price : state.totalPrice
    };
}

const mapDispatcToProps = dispatch => {
    return{
        onIngAdded : (Ing) => dispatch({type : actionTypes.ADD_ING , IngName : Ing}),
        onIngRemoved : (Ing) => dispatch({type : actionTypes.REM_ING , IngName : Ing})
    };
}

export default connect(mapStateToProps , mapDispatcToProps)(withErrorHandler(BurgerBuilder , axios));