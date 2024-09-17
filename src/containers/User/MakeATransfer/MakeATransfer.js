import React from 'react';
import classes from './MakeATransfer.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import {TextField} from '@material-ui/core';
import {connect} from 'react-redux';
import {Row, Col, Button, Table, Form} from 'react-bootstrap';
import Dinero from 'dinero.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import BreadCrumb from '../../../components/UI/BreadCrumb/BreadCrumb';
import transactLogo from '../../../assets/icons/transactions_big.png';
import NumberFormat from 'react-number-format';
import {withRouter} from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});


class MakeATransfer extends React.Component {

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
}

componentDidMount() {
    this.props.getAllTransactions(this.props.user._id);
    this.props.getAllAccountTypes();
}


makeTheTransfer = () => {
    let payload;
    const cost = this.state.amount.split('.').join('');

    if(this.state.routing_number && this.state.swift_code) {
         payload = {
            ben_account_number: this.state.beneficiary_account_number,
            ben_bank_name: this.state.beneficiary_bank_name,
            ben_name: this.state.beneficiary_name,
            phone: this.state.phone,
            bank_address: this.state.bank_address,
            amount: JSON.parse(cost),
            routing_number: this.state.routing_number,
            swift_code: this.state.swift_code,
            user_id: this.props.user._id,
            acc_id: this.state.acc_id
        }
    } else {
         payload = {
            ben_account_number: this.state.beneficiary_account_number,
            ben_bank_name: this.state.beneficiary_bank_name,
            ben_name: this.state.beneficiary_name,
            phone: this.state.phone,
            bank_address: this.state.bank_address,
            amount: JSON.parse(cost),
            user_id: this.props.user._id,
            acc_id: this.state.acc_id
        }
    }

    
   this.props.pushTransfer(payload, this.props.history);
//    this.props.history.push('/user-dashboard')

}

   render() {
    const pageLogo = <img alt='transactions' src={transactLogo}></img>
    let options;
    let offshore;
    
     options = this.props.user_accounts.map((acc_type, i) => {
         return (
             <Aux>
                   <option key={i} value={acc_type.acc_type._id} >{acc_type.acc_type.name}</option>
             </Aux>
           
         )
     });

     if(this.state.acc_id === '5f7707f70f46a9066ceef238') {
        offshore = (
            <Aux>
            <TextField
                data-aos="fade-up"
                id="filled-password-input"
                label="Routing Number"
                type="number"
                name="routing_number"
                style={{width: "100%", marginTop: "1em"}} 
                autoComplete="routing_number"
                variant="outlined"
                value={this.state.routing_number} 
                onChange={( event ) => this.setState( { routing_number : event.target.value })} 
                />
               

            <TextField
            data-aos="fade-up"
                id="filled-password-input"
                label="Swift Code"
                type="text"
                name="swift_code"
                style={{width: "100%", marginTop: "1em"}} 
                autoComplete="swift_code"
                variant="outlined"
                value={this.state.swift_code} 
                onChange={( event ) => this.setState( { swift_code : event.target.value })} 
                />  


            </Aux>
        )
     }

       return(
           <Aux>
               <div  className={classes.makeTransfer}>

               <BreadCrumb pageName='Make Transfer' pageLogo={pageLogo}/>
                   <div data-aos="fade-up" className={classes.Content}>
                       
                            <Form >

                            <Row>
                                <Col xs={12} md={6}>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select Account To Transfer from</Form.Label>
                                        <Form.Control name="acc_id" as="select"  onChange={( event ) => this.setState({ acc_id : event.target.value } )}>
                                            <option>Select Account Type</option>
                                            {options}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                    
                                    <TextField
                                            id="filled-password-input"
                                            label="Beneficiary Name"
                                            type="text"
                                            name="ben_name"
                                            style={{width: "100%", marginTop: "1em"}} 
                                            autoComplete="current-password"
                                            variant="outlined"
                                            value={this.state.beneficiary_name}  
                                            onChange={( event ) => this.setState({ beneficiary_name : event.target.value } )} 
                                            />

                                        <Form.Text className="text-muted">
                                        Name of Beneficiary Here
                                        </Form.Text>
                                    </Form.Group>

                                    <TextField
                                        id="filled-password-input"
                                        label="Bank Name"
                                        type="text"
                                        name="ben_bank_name"
                                        style={{width: "100%", marginTop: "1em"}} 
                                        autoComplete="ben_bank_name"
                                        variant="outlined"
                                        value={this.state.beneficiary_bank_name}  
                                        onChange={( event ) => this.setState({ beneficiary_bank_name : event.target.value } )}
                                        />

                                    <TextField
                                        id="filled-password-input"
                                        label="Account Number"
                                        type="text"
                                        name="ben_account_number"
                                        style={{width: "100%", marginTop: "1em"}} 
                                        autoComplete="ben_account_number"
                                        variant="outlined"
                                        value={this.state.beneficiary_account_number}  
                                        onChange={( event ) => this.setState({ beneficiary_account_number : event.target.value } )}
                                        />

                                    <TextField
                                        id="filled-password-input"
                                        label="Bank Address"
                                        type="text"
                                        name="bank_address"
                                        style={{width: "100%", marginTop: "1em"}} 
                                        autoComplete="bank_address"
                                        variant="outlined"
                                        value={this.state.bank_address} 
                                        onChange={( event ) => this.setState({ bank_address : event.target.value } )}
                                        />

                                
                                </Col>

                                <Col xs={12} md={6}>

                                    <NumberFormat 
                                        className={classes.NumberInput} 
                                        format="(###) ###-####" 
                                        onChange={( event ) => this.setState( { phone : event.target.value })}
                                        name="mobile_phone" 
                                        alue={this.state.phone}
                                        allowEmptyFormatting 
                                        />
                                         <Form.Text className="text-muted">
                                        Phone Number Here
                                        </Form.Text>


                                    <Form.Group controlId="formBasicPassword">
                                    
                                    <TextField
                                    id="filled-password-input"
                                    label="Amount"
                                    type="number"
                                    name="amount"
                                    style={{width: "100%", marginTop: "1em"}} 
                                    autoComplete="amount"
                                    variant="outlined"
                                    value={this.state.amount} 
                                    onChange={( event ) => this.setState( { amount : event.target.value })}
                                    />


                                    <Form.Text className="text-muted">
                                        Money Format must be in 0.00
                                    </Form.Text>
                                </Form.Group>

                                {offshore}
                                
                                </Col>
                            </Row>

                                <div style={{width: '100%',marginTop: '2em', marginBottom: '1em', display: 'flex', justifyContent: 'center'}}>
                                    <Button className={classes.transferBtn}  onClick={(e => this.makeTheTransfer())}>Transfer</Button>
                                </div>
                                    
                              </Form>

                   </div>
              
               </div>

           </Aux>
       );
   };
}

const mapStateToProps = (state) => {
    return {
        user: state.question.user,
        user_accounts: state.question.user.accounts.account_types
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getAllTransactions : user_id => dispatch(actions.getTransactions(user_id)),
        getAllAccountTypes : () => dispatch(actions.getActionTypes()),
        pushTransfer : (payload, history) => dispatch(actions.makeTransfer(payload, history)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MakeATransfer));