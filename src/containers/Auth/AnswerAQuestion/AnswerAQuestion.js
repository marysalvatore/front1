import React from 'react';
import classes from './AnswerAQuestion.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import NumberFormat from 'react-number-format';
import { Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});


class AnswerAQuestion extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
            q_id : '',
            answer: '',
            answer_valid: false,
            form_valid: false,
            answer_err_message: ''
       }
       this.SubmitRegForm = this.SubmitRegForm.bind(this);
   }

   componentDidMount(){
        this.props.getAllQuestions()
   }

   handleChange(e) {
    let answer = this.state.answer;
    const name = e.target.name;
    const value = e.target.value;
    answer = value
        
        this.setState({answer}, () => {
            this.validateField(name, value)
        });
    
    
  }

  validateField(fieldName, val) {
      let answer_valid = this.state.answer_valid;
      let answer_err_message = this.state.answer_err_message
      if(fieldName === 'answer') {
        answer_valid = val.length >= 5;
        answer_err_message = answer_valid ? '' : 'answer is compulsory'
      }

      this.setState({
        answer_err_message,
        answer_valid,
      },  this.validateForm);
  }

  validateForm() {
      this.setState({form_valid: this.state.answer_valid});
  }

  SubmitRegForm() {
        const payload = {
            ...this.props.regFirstStep,
            ...this.props.regSecondStep,
            q_id: this.state.q_id,
            answer: this.state.answer
        }
        console.log('payload', payload)
        this.props.submitRegisterComplete(payload, this.props.history);
  }

   render() {
       let questions;
        questions = this.props.questions.map((question, i) => {
            return (
                <Aux>
                     <option key={i+1} value={question._id} >{question.name}</option>
                </Aux>
            );
        })
       return(
           <Aux>
                <div data-aos="fade-up" className={classes.Container}>

                <div className={classes.Details}>
                
                <h4 className={classes.DetailsHeader}>Answer A Question</h4>
                <hr></hr>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Select A Question</Form.Label>
                                    <Form.Control name="acc_id" as="select"  onChange={( event ) => this.setState({ q_id : event.target.value } )}>
                                        <option >Select A Question</option>
                                        {questions}
                                    </Form.Control>
                                </Form.Group>
                            {/* <small><span className={classes.Up}>{this.state.errors.home_address}</span></small> */}
                            
                            
                            <Form.Group style={{marginTop: '2em'}} controlId="formBasicPassword">
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control className={this.state.answer_err_message ? classes.Error : ''} type="text" name="answer" placeholder="answer" value={this.state.answer}  onChange={(e) => {this.handleChange(e)}}  />
                            </Form.Group>
                            <small><span className={classes.Up}>{this.state.answer_err_message}</span></small>


                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button variant="warning"  className={classes.DetailsBtn} disabled={!this.state.form_valid} onClick={this.SubmitRegForm}>
                                    Next
                                </Button>
                                </div>
                        </Form>    



            </div>
            </div>
            
                    </Aux>
                );
            }

 }

 const mapStateToProps = props => {
     return {
         questions: props.question.questions,
         regFirstStep: props.question.registerFirstStep,
         regSecondStep: props.question.registerSecondStep
     }
 }

const mapDispatchToProps = dispatch => {
    return {
        getAllQuestions : () => dispatch(actions.getAllQuestions()),
        submitRegisterComplete: (payload, history) => dispatch(actions.RegisterUser(payload, history))
    }
} 


export default connect(mapStateToProps, mapDispatchToProps) (AnswerAQuestion);