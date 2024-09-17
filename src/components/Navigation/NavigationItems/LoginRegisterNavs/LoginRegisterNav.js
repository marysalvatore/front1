import React from 'react';
import classes from './LoginRegisterNavs.module.css';
import {NavLink} from 'react-router-dom';

const LoginRegisterNav = (props) => (
    <li className={classes.NavigationItem}> 
     <NavLink 
        activeClassName={classes.active}
        exact={props.exact}
        to={props.link}  >
            {props.children}
     </NavLink> 
    </li>
); 

export default LoginRegisterNav;