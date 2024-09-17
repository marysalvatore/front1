import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import logoBlack from '../../../assets/icons/logo_black.png';
import ansel from '../../../assets/images/logo/ansel_logo.png';
import classes from './LogoAuth.module.css';


const LogoAuth = (props) => {
    
    return(
        <Aux>
            <img alt="Logo" className={classes.Logo} src={ansel}></img>
        </Aux>
    );
}






export default LogoAuth;