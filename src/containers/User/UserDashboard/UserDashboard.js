import React from 'react';
// import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './UserDashboard.module.css';
import {Row, Col, Button, Form, Table} from 'react-bootstrap';
// import Tables from '../../components/UI/Table/Table';
import BreadCrumb from '../../../components/UI/BreadCrumb/BreadCrumb';
import {Line, Doughnut} from 'react-chartjs-2';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Dinero from 'dinero.js';
// import user from '../../../assets/icons/open_folder.png';
import dashboard from '../../../assets/icons/dashboard_big.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../../components/UI/Spinner/Spinner';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});




class Dashboard extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            labels: ['Jan', 'Feb', 'Mar',
                     'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'User',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 44, 66, 55, 45, 10, 50, 98]
              }
            ],
            state: {
                labels: ['Jan', 'Feb', 'Mar',
                        'Apr', 'May'],
                datasets: [
                    {
                    label: 'Rainfall',
                    backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#6800B4'
                    ],
                    hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                    ],
                    data: [65, 59, 80, 81, 56]
                    }
                ]
            },

          }
    //     this.createTaskHandler = this.createTaskHandler.bind(this);
    //   this.getSavings = this.getSavings.bind(this);
    //     this.getCurrentAccount = this.getCurrentAccount.bind(this);
   }

   componentDidMount() {
      let savings;
    //   let current;
      let offshore
      let userAccounts


      userAccounts = this.props.user_accounts;


      if(userAccounts){

            offshore = userAccounts.filter(a => {
              return a.acc_type.name.toLowerCase() === 'offshore'
            })

            savings = userAccounts.filter(a => {
             return a.acc_type.name.toLowerCase() === 'savings'
            });




        // current = userAccounts.filter(a => {
        //     return a.acc_type.name.toLowercase() === 'current'
        // })
         if(offshore) {
            this.getOffshore()
         } else if(savings) {
             this.getSavings();
         }

         this.props.getAllAccountTypes();
         this.props.getAllTransactions(this.props.user._id)
      } else {
          console.log('No User Aza')
      }

    }



  getSavings = () => {
    let z = this.props.user_accounts.filter(a => {
        return a.acc_type.name.toLowerCase() === 'savings'
    });

    this.props.getSavingsAccount(this.props.user._id, z[0].acc_type._id)

  }

  getOffshore = () => {
    let z = this.props.user_accounts.filter(a => {
        return a.acc_type.name.toLowerCase() === 'offshore'
    });
    this.props.getOffshoreAccount(this.props.user._id, z[0].acc_type._id);
  }


  openCreateTaskHandler = () => {
      this.setState({create: true});
  }

  closeCreateTaskHandler = () => {
    this.setState({create: false, edit: false, name: '', country: '', assigned_to: '', date: ''})
  }

getCurrentAccount = (e) => {
     console.log('i am clicked', e.target.value);
     this.setState({currentAccId: e.target.value});
     this.setCurrent()
}

setCurrent = () => {
    let currentId
    currentId = this.state.currentAccId;
    // alert('current Id  ' + currentId);
    if(currentId === '66e8b4fecf283c7d7a880d64') {
        this.getOffshore();
    } else if(currentId === '66e8b605cf283c7d7a880d66') {
        this.getSavings()
    }
}
setSavings = (savings) => {
    this.setState({currentlyOn: savings})
}
setOffshore = (offshore) => {
    this.setState({currentlyOn: offshore})
}

// handleChange = (evt) => {
//     const value = evt.target.value;
//     setState({
//       ...state.task,
//       [evt.target.name]: value
//     });
//     console.log(this.state)
// }



   render() {
        // let amount = this.props.savings.amount;
        let price;
        let options;
        let transactions
        let savings = this.props.savings
        let offshore = this.props.offshore;
        let currently
        let recentTransactions = this.props.transactions.slice(0, 3);
        let name;

        transactions = recentTransactions.map((trans, i) => {
            return (
               <tr key={i}>
                   <td>{i+1}</td>
                   <td>{trans.beneficiary_name}</td>
                   <td>{trans.beneficiary_bank_name}</td>
                   <td>{trans.beneficiary_account_number}</td>
                   <td><span className={trans.beneficiary_bank_name === 'Ansel bank' ? classes.green : classes.red}>{trans.beneficiary_bank_name === 'Ansel bank' ? '+' : '-' } {Dinero({amount: trans.amount, currency: 'USD'}).toFormat('$0,0.00')}</span></td>
                   <td><small>{new Date(trans.createdAt).toDateString()}</small></td>
                   <td> <FontAwesomeIcon onClick={e => this.getTransaction(trans._id)} icon="eye" style={{color: 'blue'}} /> </td>
               </tr>
            )
        })

       if(this.props.user_accounts.length) {
           options = this.props.user_accounts.map((acc, i) => {

            return (
                    <option key={i} value={acc.acc_type._id}>{acc.acc_type.name}</option>
            )

        });
       }


        if(savings && Object.keys(offshore).length === 0) {
            // this.setSavings(savings)
            currently = savings;
            name = "Savings"
        } else if (offshore && Object.keys(savings).length === 0) {

            // this.setOffshore(offshore)
            currently = offshore;
            name = "Offshore"
        }


        console.log('i am here', currently)


        if(currently.amount) {
            price = Dinero({amount: currently.amount, currency: 'USD'}).toFormat('$0,0.00');
        }

       const image = <img src={dashboard} className={classes.BreadCrumpLogo}  alt="dashboard"></img>;

            let Dash = <Aux>
                        <div className={classes.Dashboard}>
                            {/* <div className={classes.Side}>
                            <Sidebar ></Sidebar>
                            </div> */}

                                {/* <div className={classes.Content}>I am also here</div> */}
                        <BreadCrumb pageName='Dashboard' pageLogo={image} />
                        <div data-aos="fade-up" className={classes.Content}>

                            <Row style={{paddingTop: '7em'}}>
                                    <Col xs={12} sm={12} md={4}>
                                        <Row >
                                        <Col  xs={12} sm={12} md={12} >
                                            <h2>Hello {this.props.user.first_name} {this.props.user.last_name}</h2>
                                        </Col>


                                        <Col className={classes.TopDown} xs={12} sm={12} md={12}>
                                        New Message
                                        <span className={classes.TopDownSpan}>15</span>
                                        </Col>

                                        </Row>
                                    </Col>

                                    <Col className={classes.TopRight}  xs={12} md={7}>
                                    <Line
                                        width={100}
                                        height={40}
                                        data={this.state}
                                        options={{
                                            title:{
                                            display:true,
                                            text:'Progress Report',
                                            fontSize:20
                                            },
                                            legend:{
                                            display:true,
                                            position:'right'
                                            }
                                        }}
                                    />
                                    </Col>
                                        {/* <Tables getTask={this.getTaskHandler} allTasks={this.state.allTasks}  deleteTask={this.deleteTaskHandler.bind(this)} /> */}
                                </Row>


                                    <Row style={{paddingTop: '5em'}}>

                                        <Col className={classes.Middle1} xs={12} md={4}>
                                            <Row>
                                                <Col xs={12} md={6} >
                                                <span style={{fontWeight: 'bold'}}>Available Balance</span> <br />
                                                <span><small> {name} Account # </small><small style={{fontWeight: 'bold'}}>{currently.account_number}</small></span>
                                                </Col>
                                                <Col xs={12} md={6} style={{paddingRight: '10px', fontSize: '8px'}}>
                                                    <Form >
                                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                                        <option>Select Account</option>
                                                        <Form.Control name="acc_id" as="select" onChange={ e => this.getCurrentAccount(e) } style={{fontSize: '.8rem'}} >

                                                            {options}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    </Form>
                                                </Col>
                                            </Row>
                                            <h1 style={{marginTop: '.5em'}}>{price}</h1> <br />

                                            <Button style={{float: 'right'}} variant="danger">View Statement</Button>{' '}

                                        </Col>
                                        <Col className={classes.Middle} xs={12} md={3}>
                                            <span style={{fontWeight: 'bold'}}>Upcoming Payments</span><span style={{float: 'right'}}>18.12.20</span> <br />
                                            <span>AT&T Family Package Plan</span><br /><br />
                                            <h1>$350</h1> <br /><br />
                                            <Button style={{float: 'right'}} variant="" className={classes.Btn}>Pay Now</Button>{' '}

                                        </Col>

                                        <Col className={classes.Middle} xs={12} md={3}>
                                            <span style={{fontWeight: 'bold'}}>Savings</span> <br />
                                            <Doughnut
                                                width={50}
                                                height={40}
                                                data={this.state.state}
                                                options={{
                                                    title:{
                                                    display:true,
                                                    text:'Average Savings per month',
                                                    fontSize:20
                                                    },
                                                    legend:{
                                                    display:true,
                                                    position:'right'
                                                    }
                                                }}
                                                />
                                        </Col>


                                    </Row>


                                    <Row style={{paddingTop: '3em'}}>
                                    <p style={{paddingLeft: '2em'}}>Recent Transactions</p>
                                    <Col xs={12} md={12} >
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                    <th>#</th>
                                                    <th>Beneficiary Name</th>
                                                    <th>bank name</th>
                                                    <th>account_no</th>
                                                    <th>amount</th>
                                                    <th>date</th>
                                                    <th>actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {transactions}

                                                </tbody>
                                                </Table>
                                            </Col>


                                    </Row>
                                </div>
                        </div>
                        </Aux>;

       const actual = !savings && !offshore ? <Spinner /> : Dash;
       return (
          <Aux>
              {actual}
          </Aux>
       )
   }


}

const mapStateToProps = state => {
    return {
        user: state.question.user,
        savings: state.user.savings,
        offshore: state.user.offshore,
        user_accounts: state.question.user_accounts,
        transactions: state.transactions.transactions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       getOffshoreAccount : (user_id, acc_id) => dispatch(actions.fetchOffshoreAccount(user_id, acc_id)),
       getSavingsAccount : (user_id, acc_id) => dispatch(actions.fetchSavingsAccount(user_id, acc_id)),
       getAllAccountTypes : () => dispatch(actions.getActionTypes()),
       getAllTransactions : user_id => dispatch(actions.getTransactions(user_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);