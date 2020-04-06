import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Cheese', type : 'cheese'},
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Meat', type : 'meat'}
];

const BuildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
      

        {controls.map(ctrl =>(
            <BuildControl key = {ctrl.label} 
            label = {ctrl.label} 
            added = {()=>props.addIng(ctrl.type)}
            removed = {() =>props.removeIng(ctrl.type)}
            disabled= {props.disabled[ctrl.type]}
            />
        ))}

        <button className = {classes.OrderButton} onClick = {props.ordered}
                disabled = {!props.purchasable} >  ORDER NOW</button>

    </div>
);

export default BuildControls;