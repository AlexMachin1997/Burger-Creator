import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            error: null
        }

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                //Resets The Error Message And Forwards The Request
                this.setState({error: null })
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                //State Error Is Set Tot This Error In Componenet Did Mount
                this.setState({error: error})
                console.log(error);
            })
        }

        componentWillUnmount(){
            console.log("Annoymus Class Is Dismounting Hold On");
            console.log("Interceptor Request " + this.resInterceptor);
            console.log("Interceptor Response " + this.reqInterceptor);
       
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>

                        {/* 
                            Logic Notes:
                            Turnary If Statement
                            If True then show message
                            Else null (Dont Show Message )
                        */} 
                        {this.state.error ? this.state.error.message: null}
                    </Modal>

                <WrappedComponent {...this.props}  />
            </Aux>
            )
        }
    }
}

export default withErrorHandler;