import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import layoutCss from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css'
import DropDownLinks from '../../components/Navigation/DropDownLinks/DropDownLinks';
import SideBar from '../../components/Navigation/Sidebar/Sidebar';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { logoutUser } from '../../utils/cache';
import Noty from 'noty';
import {withRouter } from 'react-router-dom';
import IdleTimer from '../../components/UI/IdleTimer/IdleTimer';
import axios from '../../axios-url';

class Layout extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
        showSideDrawer: false,
        isTimeout: 240,
        setIsTimeout: () => {}
        }
      
      this.logoutHandler = this.logoutHandler.bind(this)
      
   }


   componentDidMount() {
      new IdleTimer({
       timeout: this.state.isTimeout,
       onTimeout: () => {
         this.state.setIsTimeout(true)
       },
       logoutHandler : this.logoutHandler
     })
   }

   componentDidUpdate() {
    new IdleTimer({
     timeout: this.state.isTimeout,
     onTimeout: () => {
       this.state.setIsTimeout(true)
     },
     logoutHandler : this.logoutHandler
   })
 }




logoutHandler = () => {
    // this.setState({ isAuth: false, token: null });
    
    const authObj = {isAuth: false}; 
    this.props.unauthenticate(authObj);
    axios.post('/auth/logout')
    .then(data => {
      const logout = logoutUser()
      console.log('data', data.data)

      if(logout) {
        new Noty({  
        text: "Logged Out Successfully!!!",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "success",
        timeout:"3000"
      }).show();
       
       this.props.history.push('/');
      }
    })
    .catch(err => {
      console.log(err)
    })
   
    
  }

   sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    
    toggleSideDrawer = () => {
        this.setState((prevState) => {
          return  {showSideDrawer: !prevState.showSideDrawer}
        })
    }


   render() {

    console.log("pros", this.props)
    // const toolbar = this.props.children.props.path === '/' ? <p className={classes.LoginHead}>Welcome Back!</p> : 
    let toolbars

    if(this.props.isAuth){
      toolbars = <DropDownLinks isAuth={this.props.isAuth} />
    } else {
      if(this.props.location.pathname === '/auth/login' || this.props.location.pathname === '/auth/register'){
        toolbars = ''
      } else {
        toolbars =  <Toolbar isAuth={this.props.isAuth} logout={this.logoutHandler}  toggle={this.toggleSideDrawer}  />
      }
    }

    const sidebar = this.props.isAuth ? <Aux><div className={classes.Side}><SideBar logout={this.logoutHandler} role={this.props.role} /> </div></Aux> : null;
    return <Aux>
        <div className={classes.Layout}>
        {toolbars}
        <SideDrawer open={this.state.showSideDrawer}  closed={this.sideDrawerClosedHandler} />
        {sidebar}
        <div className={this.props.isAuth ? layoutCss.Content1 : layoutCss.Content}>
            {this.props.children}
        </div>
        </div>
       
    </Aux>
   }
}

const mapDispatchToProps = dispatch => {
    return {
        unauthenticate : (authObj) => dispatch(actions.setAuthFailure(authObj))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Layout));