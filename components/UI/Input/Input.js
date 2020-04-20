import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputEle = null;

    switch(props.inptype){
        case ('input'):
            inputEle = <input className={classes.InputEle} 
            {...props.elementConfig} value = {props.value}
            onChange = {props.changed}/>;
            break;
        case ('textarea'):
            inputEle = <textarea className={classes.InputEle}
             {...props.elementConfig} value = {props.value}
             onChange = {props.changed}/>;
            break;
        case ('select'):
            inputEle = ( 
            <select className={classes.InputEle}
             value = {props.value} 
             onChange = {props.changed}>
               {props.elementConfig.Options.map(opt =>(
                   <option value = {opt.value}
                            key = {opt.value}>
                        {opt.displayValue}
                   </option>
            ))}
             </select>
             );
             break;
        default:
            inputEle = <input className={classes.InputEle}
             {...props.elementConfig} value = {props.value} 
             onChange = {props.changed}/>;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputEle}
        </div>
    );

    

}

export default input;