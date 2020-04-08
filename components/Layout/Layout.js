import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer : false
    };

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer : false});
    }

    toggleSideDrawerHandler = () =>{
        let doShowSideDrawer = this.state.showSideDrawer;
        this.setState(prevState => {
                return{showSideDrawer:!prevState.doShowSideDrawer}
        });
    }

    render(){
        return(
            <Aux>
            <Toolbar clicked = {this.toggleSideDrawerHandler}/>
            <SideDrawer show = {this.state.showSideDrawer} closeSD = {this.SideDrawerCloseHandler}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;