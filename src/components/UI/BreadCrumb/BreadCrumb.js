import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './BreadCrumb.module.css';
import {Row, Col} from 'react-bootstrap';
// import user from '../../../assets/icons/open_folder.png';
// import dashboard from '../../../assets/icons/dashboard.png';



const BreadCrumb = (props) => {
   return(
      <Aux>
          <div className={classes.BreadCrumb}>
              <ul>
                 <Row>
                     <Col md={12}>
                     {props.pageLogo}
                        <span className={classes.pageWord}>{props.pageName}</span> <br />
                        
                     </Col>
                 </Row>
              </ul>

              {/* <ul style={{display: 'flex'}}>
                  <li className={classes.Cornered}><img src={user} alt="user"></img></li>
              </ul> */}
          </div>
      </Aux>
   )

}






export default BreadCrumb;