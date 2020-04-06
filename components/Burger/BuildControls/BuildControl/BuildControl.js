import React from 'react';
import classes from './BuildControl.css';




const BuildControl = (props) => (
    <div className = {classes.BuildControl}>
     <div className = {classes.Label}>{props.label}</div>
        
        <button className={classes.Less}
                onClick={props.removed}
                disabled = {props.disabled} > Less</button>
       
        <button className = {classes.More} 
         onClick = {props.added}> More </button>
    </div>
);

export default BuildControl;

//toFixed method convert decimal values to 2 length e.g : 2.00,1.22