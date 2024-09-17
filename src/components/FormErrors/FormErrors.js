import React from 'react';
import classes from './Toolbar.module.css'
import Aux from '../../hoc/Auxiliary/Auxiliary';


const FormErrors = (props) => {
   let formErrors = props.formErrors;
    return (
        <Aux>
             {Object.keys(formErrors).map((fieldName, i) => {
                if(formErrors[fieldName].length > 0){
                    return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                    )        
                } else {
                    return '';
                }
            })}
        </Aux>
    );
}




export default FormErrors;