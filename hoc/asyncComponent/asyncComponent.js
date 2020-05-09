import React, {Component} from 'react';

const asyncComponent = (ImportComp) =>{
    return class extends Component{

        state = {
            comp : null
        }

        componentDidMount(){
            ImportComp()
            .then(cmp =>{
                this.setState({comp : cmp.default});
            });
        }

        render(){
            const C = this.state.comp;
            return C ? <C {...this.props} /> : null;
        }
        
    }
}

export default asyncComponent;