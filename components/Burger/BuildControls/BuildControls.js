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

        {controls.map(ctrl =>(
            <BuildControl key = {ctrl.label} 
            label = {ctrl.label} 
            added = {()=>props.addIng(ctrl.type)}
            />
        ))}

    </div>
);

export default BuildControls;