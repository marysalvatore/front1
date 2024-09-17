import React from 'react';
// import {HashRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './hoc/Layout/Layout';
import classes from './App.module.css';
import {connect} from 'react-redux';
import { getToken, getUserData } from './utils/cache';
import * as actions from './store/actions/index';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import Aux from './hoc/Auxiliary/Auxiliary';
import RoutesDomain from './routes/Routes'
// import classNames from 'classnames';




library.add(faCheckSquare, faCoffee)



class App extends React.Component {

   constructor(props) {
     super(props)
     
     this.state = {
     animate : false,
     cover: true
     }
    
    
    
    // this.warn = this.warn.bind(this);
   
   
  }
 

   componentDidMount() {
    //  console.log('[App.js]', this.props);
    // setTimeout(() => {
    //   this.setLayout()
    // }, 5000)
     const token = getToken();
     const user = getUserData();
     let authObj;
     if(token && user) {
       authObj = {isAuth: true};
       
       this.props.authenticate(authObj);
       this.props.setUserSuccess(user);
       this.props.setUserAccounts(user.accounts.account_types)

     } else {
      authObj = {isAuth: false}; 
      this.props.unauthenticate(authObj)
     }
   }

   setLayout = () => {
     this.setState({cover: false})
   }
   


  // warn() {
  //   alert("You will be logged out automatically in 1 minute.");
  // }

   
  

   
    render() {

      
          let layout
          // if (this.state.cover) {
          //   layout = <Preloader />
          //   setTimeout(this.setLayout, 3000)
          // } else {
            layout = <Aux>
                <Layout isAuth={this.props.isAuth} role={this.props.user.role} >
                  
                  <RoutesDomain  
                  registerFirstStep={this.props.registerFirstStep} 
                  registerSecondStep={this.props.registerSecondStep}
                  otp={this.props.otp}
                  question={this.props.question}
                  isAuth={this.props.isAuth}
                  user={this.props.user}
                  />
                            
                </Layout>
                  </Aux>
          // }

        return(
        
          <div className={classes.App}>
            
           {layout}
            
          </div>
         
        );
    }

}

const mapStateToProps = state => {
  return {
    isAuth : state.question.isAuth,
    user: state.question.user,
    registerFirstStep: state.question.registerFirstStep,
    registerSecondStep: state.question.registerSecondStep,
    otp: state.question.otp,
    question: state.question.question
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate : (authObj) => dispatch(actions.setAuthSuccess(authObj)),
    unauthenticate : (authObj) => dispatch(actions.setAuthFailure(authObj)),
    setUserSuccess : (user) => dispatch(actions.sendTokenSuccess(user)),
    setUserFail : (err) => dispatch(actions.sendTokenFail(err)),
    setUserAccounts: (data) => dispatch(actions.saveUserAccounts(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
