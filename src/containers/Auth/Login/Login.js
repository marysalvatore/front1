import React from 'react';
import classes from './Login.module.css';
// import {  Button, Form, InputGroup} from 'react-bootstrap';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import axios from '../../../axios-url';
import {withRouter} from 'react-router-dom';
// import Noty from 'noty';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {TextField, Checkbox} from '@material-ui/core';
import {  Button} from 'react-bootstrap';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authLoading: false,
          isAuth: false,
          loginDetails: {
            username : '',
            password : '',
          }
      }
      this.loginHandler = this.loginHandler.bind(this)
      }

    handleChange(e) {
        let user = this.state.loginDetails;
        user[e.target.name] = e.target.value
        this.setState({loginDetails : {...user}});
      }

      loginHandler(e) {
        e.preventDefault();
        this.setState({authLoading: true})
        const payload = {...this.state.loginDetails};
        this.props.loginHandler(payload, this.props.history, this.state.authLoading)
      }

    render() {
        // console.log('history', this.props.history);
        return (
         <Aux>
             
            {/* {spin} */}
            <div data-aos="fade-up" className={classes.Container}>
                <div className={classes.loginContainer}>

                <div className={classes.Login}>
               
                  <h4>Login</h4>
                  <hr></hr>
                    <form noValidate autoComplete="off">

                          <TextField 
                            id="username" 
                            label="User ID" 
                            name="username" 
                            style={{width: "100%"}} 
                            variant="outlined" 
                            value={this.state.loginDetails.username}  
                            onChange={(e) => {this.handleChange(e)}} 
                            />
                          

                          <TextField
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            style={{width: "100%", marginTop: "1em"}} 
                            autoComplete="current-password"
                            variant="outlined"
                            value={this.state.loginDetails.password}  
                            onChange={(e) => {this.handleChange(e)}} 
                          />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button className={classes.LoginBtn} onClick={this.loginHandler} >
                                Take me to Online Banking
                            </Button>

                           
                            </div>
                            <p style={{marginTop: "1em"}}>
                            Ansel Bank and its employees will never email, call or otherwise ask you for your user name, password or other electronic banking credentials.
                            </p>
                          </form>
                  </div>
                  <div className={classes.loginSideImage}>
                    <h1>New Here?</h1> 
                    <p >
                      SignUp and discover a great amount of new opportunities
                    </p>

                    <Button href="/auth/register" className={classes.clickRegister}>Register</Button>
                  </div>
                </div>
               
            </div>
            </Aux>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
      loginHandler : (payload, history, loading) => dispatch(actions.loginHandler(payload, history, loading))
    }
}


export default connect(null, mapDispatchToProps) (withRouter(Login));