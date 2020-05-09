import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component{

    state = {
        showSideDrawer : false
    };

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer : false});
    }

    toggleSideDrawerHandler = () =>{
        
        this.setState(prevState => {
                return{showSideDrawer:!prevState.doShowSideDrawer}
        });
    }

    render(){
        return(
            <Aux>
            <Toolbar 
                isAuth = {this.props.isAuth}
            clicked = {this.toggleSideDrawerHandler}/>
            <SideDrawer
                 isAuth = {this.props.isAuth}
            show = {this.state.showSideDrawer} closeSD = {this.SideDrawerCloseHandler}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuth : state.auth.tokenId !== null
    };
}

export default connect(mapStateToProps)(Layout);