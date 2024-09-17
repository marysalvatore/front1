import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

// import {Form} from 'react-bootstrap';


const NavigationItems = (props) => (
        <div className={classes.NavigationItems}>
          <ul>
          <NavigationItem className={classes.Link} link="/" exact>Personal</NavigationItem>
          </ul>

          <ul>
          <NavigationItem className={classes.Link} link="!#" exact>Business</NavigationItem>
          </ul>
          <ul>
          <NavigationItem className={classes.Link} link="!#" exact>Mortgage</NavigationItem>
          </ul>

          <ul>
          <NavigationItem className={classes.Link} link="$" exact>Locations</NavigationItem>
          </ul>

          

          {/* <ul >
                  <div className={classes.SearchForm}>
                        <Form >
                        <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Search" />
                                
                        </Form.Group>
                        </Form>    
                  </div>
        
          </ul> */}
        
        </div>

   
    
)


    

export default NavigationItems;