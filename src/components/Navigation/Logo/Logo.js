import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ansel from '../../../assets/images/logo/ansel_logo.png';
import classes from './Logo.module.css';


const Logo = (props) => {
    
    return(
        <Aux>
            <img alt="Logo" className={classes.Logo} src={ansel}></img>
        </Aux>
    );
}






export default Logo;