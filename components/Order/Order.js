import React from 'react';
import classes from './Order.css'

const order  = (props) => {

   const ingredients = [];
    for (let ingName in props.ingredients)
            {
                ingredients.push({
                    name : ingName,
                    amount : props.ingredients[ingName]
                });
            }

    let ingOutput = ingredients.map(ig =>{
    return <span key = {ig.name} 
                style = {{
                    textTransform : 'capitalize',
                    margin : '0 8px',
                    display : 'inline-block',
                    border : '1px solid #ccc',
                    padding : '5px'

                }}>
        {ig.name} ({ig.amount})
        </span>;
    });
    return(
    <div className = {classes.Order}>
        
            <p>Ingredients : {ingOutput}</p>
            <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}  USD</strong></p>
    </div>

);
};

export default order;