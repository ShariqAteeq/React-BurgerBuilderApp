import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer , classes.Close];
    if(props.show){
        attachedClasses = [classes.SideDrawer , classes.Open];
    }

    return(
        <Aux>
            <Backdrop show = {props.show} clicked = {props.closeSD} />
        <div className= {attachedClasses.join(' ')} onClick = {props.closeSD}>
            <div className= {classes.Logo}>
        <Logo />
        </div>
         <nav>
                <NavigationItems isAuth = {props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;