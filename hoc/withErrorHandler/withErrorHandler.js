import React , {Component} from 'react';

import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            error : null
        }
        componentWillMount(){

           this.reqInter =  axios.interceptors.request.use(req =>{
                this.setState({error : null});
                return req;
            });

            this.resInter = axios.interceptors.response.use(null, err=>{
                this.setState({error : err});
                //return res;
            });

        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);
        }
        confirmedError =() =>{
                this.setState({error : null});
        }


        render(){
            return(
                <Aux>
                    <Modal show = {this.state.error}
                            modalClosed = {this.confirmedError}
                            >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;