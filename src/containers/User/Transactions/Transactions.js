import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';
import classes from './Transactions.module.css';
import BreadCrumb from '../../../components/UI/BreadCrumb/BreadCrumb';
import {Row, Col, Button, Table, Form} from 'react-bootstrap';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Dinero from 'dinero.js';
// import Dinero from 'dinero.js';
import transactLogo from '../../../assets/icons/transactions_big.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../../components/UI/Spinner/Spinner';
import {TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});



class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
        makeTransfer: false,
        beneficiary_account_number : null,
        beneficiary_bank_name: '',
        beneficiary_name: '',
        phone: '',
        bank_address: '',
        routing_number: null,
        swift_code: '',
        amount: '0.00',
        acc_id: '',
        showTransaction: false
    }
     this.getTransaction = this.getTransaction.bind(this)
    }
  
    

  componentDidMount() {
      this.props.getAllTransactions(this.props.user._id);
      this.props.getAllAccountTypes();
  }

  openMakeTransfer = () => {
    this.setState({makeTransfer: true})
}

 closeMakeTransfer = () => {
     this.setState({makeTransfer: false})
 }

 showSingleTransaction = () => {
     this.setState({showTransaction: true})
 }

 closeSingleTransaction = () => {
     this.setState({showTransaction: false})
 }

 getTransaction = (transaction_id) => {
     this.showSingleTransaction()
     this.props.getSingleTransaction(this.props.user._id, transaction_id)
 }

   
  render() {
      
    const pageLogo = <img alt='transactions' src={transactLogo}></img>
     let transactions;
     let modal;
     
     

     if(!this.props.transactions) {
         transactions = <Spinner></Spinner>
     } else {
        transactions = this.props.transactions.map((trans, i) => {
            return (
               <tr key={i}>
                   <td>{i+1}</td>
                   <td>{trans.beneficiary_name}</td>
                   <td>{trans.beneficiary_bank_name}</td>
                   <td>{trans.beneficiary_account_number}</td>
                   <td><span style={{color: 'red'}}>- {Dinero({amount: trans.amount, currency: 'USD'}).toFormat('$0,0.00')}</span></td>
                   <td><small>{new Date(trans.createdAt).toDateString()}</small></td>
                   <td> <FontAwesomeIcon onClick={e => this.getTransaction(trans._id)} icon="eye" style={{color: 'blue'}} /> </td>
               </tr>
            )
        })
     }
     
     let a
     if(this.state.showTransaction) {
        //  console.log('is amount an integer', Number.isInteger(this.props.transaction.amount))
         if(Number.isInteger(this.props.transaction.amount)) {
            a = <Aux>
                <p ><span style={{fontWeight: 'bold'}}>Amount</span>: <span style={{color: 'red'}}>- {Dinero({amount: this.props.transaction.amount, currency: 'USD'}).toFormat('$0,0.00')}</span></p>
                 </Aux>
            
         }
         modal = <Aux>
        <Modal show={this.state.showTransaction} modalClosed={this.closeSingleTransaction}>
                    <h4 style={{borderBottom: '1px solid #dcdcdc', paddingBottom: '.5em'}}>View Transaction</h4>
                    <p><span style={{fontWeight: 'bold'}}>Beneficiary Name </span>: {this.props.transaction.beneficiary_name}</p>
                    <p><span style={{fontWeight: 'bold'}}>Beneficiary Account Number </span>: {this.props.transaction.beneficiary_account_number}</p>
                    <p><span style={{fontWeight: 'bold'}}>Beneficiary Bank Name</span>: {this.props.transaction.beneficiary_bank_name}</p>
                    <p><span style={{fontWeight: 'bold'}}>Bank Address</span>: {this.props.transaction.bank_address}</p>
                    {a}
         </Modal>
    </Aux>
     }

      return(
          <Aux>
              <div className={classes.Transactions}>
                {/* <div className={classes.Side}>
                  <Sidebar ></Sidebar>
                  </div> */}
                    <BreadCrumb pageName='Transactions' pageLogo={pageLogo}/>
                    
                    {modal}
                    
                <div data-aos="fade-up" className={classes.Content}>
                        <Row style={{paddingTop: '7em'}}>
                               <Row style={{width: '100%'}}>   
                               <Col xs={6} md={6}>
                               <h1>Transactions</h1>
                               </Col>
                               <Col xs={6} md={6}>
                               {/* onClick={this.openMakeTransfer} */}
                               <Link variant="" to="/make-transfer" className={classes.makeTransferBut} >Make a Transfer</Link>
                               </Col>
                               </Row>
                                
                                <Col xs={6} md={12}>
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
          </Aux>
      )
  }


}

const mapStateToProps = state => {
    return {
        user: state.question.user,
        transactions: state.transactions.transactions,
        transaction: state.transactions.transaction,
        account_types: state.transactions.account_types,
        user_accounts: state.question.user.accounts.account_types,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllTransactions : user_id => dispatch(actions.getTransactions(user_id)),
        getAllAccountTypes : () => dispatch(actions.getActionTypes()),
        pushTransfer : (payload, history) => dispatch(actions.makeTransfer(payload, history)),
        getSingleTransaction : (user_id, transaction_id) => dispatch(actions.getTransaction(user_id, transaction_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);