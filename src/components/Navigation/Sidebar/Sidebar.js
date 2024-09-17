import React from 'react';
import classes from './Sidebar.module.css';
import {Link} from 'react-router-dom';
import dashboard from '../../../assets/icons/dashboard.png';
import banking from '../../../assets/icons/banking.png';
// import john_doe from '../../../assets/images/john_doe.jpeg';
import inventory from '../../../assets/icons/inventory.png';
import transactions from '../../../assets/icons/transactions.png';
import profile from '../../../assets/icons/profile.png';
import logout from '../../../assets/icons/logout.png';
import AdminImg from '../../../assets/images/switch.jpeg';
import {withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import * as config from '../../../config';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Sidebar extends React.Component{

//  componentDidMount() {
//  }

   render() {
      const url = config.BACKEND_URL + this.props.user.photo
      let currentSideBar
      if(this.props.role == 'admin') {
      currentSideBar = <Aux>
            <ul>
                 <li >
                    <Link className={this.props.location.pathname === '/user-dashboard' ? classes.active : ''}  to="/user-dashboard">
                       <img src={dashboard} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Dashboard</span>
                    </Link>
                  </li>

                      
               {/* <li>
                  <Accordion style={{width: "cover", marginLeft: "-2.3em"}} >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography style={AccordionHead}>Savings Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography style={MuiTypography_body1}>
                        you can be sure that you will always have one of the market's best bank interest rates on your deposited funds. Of course, it is free to establish a savings account when you have an account with us.
                        </Typography>
                        </AccordionDetails>
                     </Accordion>
               </li> */}
  
                 

                  <li >
                    <Link  onClick={this.props.logout}>
                       <img src={logout} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Logout</span>
                    </Link>
                  </li>
  
                  
            </ul>
         </Aux>
      } else {
         currentSideBar = <Aux>
              <ul>
                 <li >
                    <Link className={this.props.location.pathname === '/user-dashboard' ? classes.active : ''}  to="/user-dashboard">
                       <img src={dashboard} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Dashboard</span>
                    </Link>
                  </li>

                      
               {/* <li>
                  <Accordion style={{width: "cover", marginLeft: "-2.3em"}} >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography style={AccordionHead}>Savings Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography style={MuiTypography_body1}>
                        you can be sure that you will always have one of the market's best bank interest rates on your deposited funds. Of course, it is free to establish a savings account when you have an account with us.
                        </Typography>
                        </AccordionDetails>
                     </Accordion>
               </li> */}
  
                  <li >
                    <Link  to="/">
                       <img src={banking} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Banking</span>
                    </Link>
                  </li>
  
                  <li >
                    <Link  to="/">
                       <img src={inventory} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Inventory</span>
                    </Link>
                  </li>
  
                  <li >
                    <Link className={this.props.location.pathname === '/user-transactions' ? classes.active : ''}  to="/user-transactions">
                       <img src={transactions} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Transactions</span>
                    </Link>
                  </li>
  
                  <li >
                    <Link  className={this.props.location.pathname === '/profile' ? classes.active : ''}  to="/profile">
                       <img src={profile} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Profile</span>
                    </Link>
                  </li>

                  <li >
                    <Link  onClick={this.props.logout}>
                       <img src={logout} alt=""></img>
                       <span style={{color: 'black', marginLeft: '1em', marginTop: '3em'}}>Logout</span>
                    </Link>
                  </li>
  
                  
            </ul>
         </Aux>
       
      }
      return (
         <div className={classes.Sidebar}>
            <div style={{display: 'flex', justifyContent: 'center', }}>
               <img src={this.props.role == 'admin' ? AdminImg : url} style={{height: '10em', marginTop: '.7em'}} alt="profile"></img>
            </div>
            
            {currentSideBar}
         </div>
         
     )
   }
   
}

const MuiTypography_body1 = {
   fontFamily: "inherit",
   textAlign: "left",
   boxShadow: 'none'
}

const AccordionHead = {
 fontFamily: "inherit"
}

const mapStateToProps = state => {
   return {
      user: state.question.user
   }
}

export default connect(mapStateToProps, null)(withRouter(Sidebar));
