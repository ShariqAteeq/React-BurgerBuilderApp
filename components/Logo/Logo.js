import React from 'react';
import BurgerLogo from '../../assets/Images/logo.png';
import classes from './Logo.css';

const logo  = (props) =>(
    <div className={classes.Logo}>
            <img src ={BurgerLogo} alt = "MyBurger" />
    </div>
);

export default logo;