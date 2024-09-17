import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './DropDownLinks.module.css'
import {Dropdown} from 'react-bootstrap'
// import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import {connect} from 'react-redux';
import LogoAuth from '../LogoAuth/LogoAuth';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import logout from '../../../assets/icons/logoout_white.png';

class DropDownLinks extends React.Component {
  
    
    render() {
        let menu;
        let image;
        if (this.props.isAuth) {
               menu = <nav>
                 <Dropdown style={{color: 'white'}}>
                    {/* <Dropdown.Toggle variant="" style={{color: 'white'}} id="dropdown-basic"> */}
                        Welcome {this.props.user.first_name} {this.props.user.last_name}
                    {/* </Dropdown.Toggle> */}
                     
                    
                    <span style={{marginLeft: '1em'}}>
                    <img style={{height: '1.5em'}} src={logout} alt=""></img>
                    </span>
    
                </Dropdown>
                   </nav>
        } else {
               menu = <nav className={classes.DesktopOnly}>
                
                </nav>
        }

      if(this.props.isAuth) {
          image = <LogoAuth  isAuth={this.props.isAuth} />
      } 




        return(
            <Aux>
                <div className={this.props.isAuth ? classes.DownNav1 : classes.DownNav}>

                <DrawerToggle toggled={this.props.toggle} />

                    <nav>
                        {image}
                    </nav>
                    {menu}
                </div>
            </Aux>
        );
    }

   
}

const mapStateToProps = state => {
    return {
        user: state.question.user
    }
}



export default connect(mapStateToProps, null)(DropDownLinks);