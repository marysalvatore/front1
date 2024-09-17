import React from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import {Switch,Route, Redirect } from 'react-router-dom';

// Users Containers
import Home from '../containers/Home/Home';
import Login from '../containers/Auth/Login/Login';
import Register from '../containers/Auth/Register/Register';
import Details from '../containers/Auth/Details/Details';
import AnswerAQuestion from '../containers/Auth/AnswerAQuestion/AnswerAQuestion';
import OTP from '../containers/Auth/OTP/otp';
import QuestionAnswer from '../containers/Auth/QuestionAnswer/QuestionAnswer';
import UserDashboard from '../containers/User/UserDashboard/UserDashboard';
import Transactions from '../containers/User/Transactions/Transactions';
import Profile from '../containers/User/Profile/Profile';
import MakeATransfer from '../containers/User/MakeATransfer/MakeATransfer';
import TitleComponent from '../components/UI/TitleComponent/TitleComponent';


//Admin Containers
import AdminDashboard from '../containers/Admin/AdminDashboard/AdminDashboard';

function Routes(props) {

    const withTitle = ({ component: Component, title }) => {
        return class Title extends React.Component {
            render() {
                return (
                    <React.Fragment>
                        <TitleComponent title={title} />
                        <Component {...props} />
                    </React.Fragment>
                );
            }
        };
    };

     // const DetailsComponent = withTitle({component: Details, title: 'More Details'})
    const HomeComponent = withTitle({component: Home, title: 'HomePage'});
    const LoginComponent = withTitle({component: Login, title: 'Login'});
    const RegisterComponent = withTitle({component: Register, title: 'Register'})
    const OTPComponent = withTitle({component: OTP, title: 'OTP access'});
    const QuestionAnswerComponent = withTitle({component: QuestionAnswer, title: 'Answer'})
    const UserDashboardComponent = withTitle({component: UserDashboard, title: 'User Dashboard'})
    const ProfileComponent = withTitle({component: Profile, title: 'User Profile'});
    const TransactionComponent = withTitle({component: Transactions, title: 'Transactions'})
    const MakeATransferComponent = withTitle({component: MakeATransfer, title: 'Make A Transfer'})
    
    //Admin Components
    const AdminDashboardComponent = withTitle({component: AdminDashboard, title: 'Admin Dashboard'})
    
    // console.log('question', this.props.question);
    let details;
    let firstStep = props.registerFirstStep;
    let secondStep = props.registerSecondStep

    if(Object.keys(firstStep).length >= 7) {
        details = <Aux>
          <Route path="/auth/details" render={props => (
               <Details
                 {...props}
               />
               )} />
        </Aux>
      }
      
      if(Object.keys(secondStep).length >= 4) {
       details = <Aux>
           <Route path="/auth/answer" render={props => (
               <AnswerAQuestion
                 {...props}
               />
               )} />
       </Aux>
      } 


      if(Object.keys(props.otp).length === 1) {
       details = <Route path="/auth/otp" exact component={OTPComponent} />
      }


      if(Object.keys(props.question).length >= 2) {
        details =  <Route path="/auth/question-answer" exact component={QuestionAnswerComponent} />

      }

      let routes = (
          
        // <SwitchWithSlide>
        <Switch>

              <Route path="/" exact component={HomeComponent} />

             
              <Route path="/auth/login" component={LoginComponent} />
              
              
              
              <Route path="/auth/register"  component={RegisterComponent} />

              {details}

              {/* <Route path="/auth/answer-a-question"  render={props => (
              <AnswerAQuestion
                {...props}
              />
              )} /> */}
              
            <Redirect exact to="/auth/login"/>
            
        {/* </SwitchWithSlide> */}
        </Switch>
         
        )

        if(props.isAuth) {
            if(props.user.role == 'admin') {

              routes = (
                <Switch>
                    <Route path="/admin-dashboard" exact component={AdminDashboardComponent} />

                      
                    <Redirect exact to="/admin-dashboard"/>

              </Switch>
              )
            } else {
              routes = (
                <Switch>
  
                      <Route path="/make-transfer" exact component={MakeATransferComponent} />
  
                      <Route path="/profile" exact component={ProfileComponent} />
                      
                      <Route path="/user-dashboard" exact component={UserDashboardComponent} />
  
                      <Route path="/user-transactions" exact component={TransactionComponent} />
  
                        
                      <Redirect exact to="/user-dashboard"/>
  
                </Switch>
                
              )
            }
            
          }


    return (
        <Aux>

            {routes}
            
        </Aux>
    );
}

export default Routes;