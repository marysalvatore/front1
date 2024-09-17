import React from 'react';
import classes from './QuestionAnswer.module.css';
import {  Button, Form} from 'react-bootstrap';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {TextField} from '@material-ui/core';
import {withRouter} from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({duration: 2000});

class Otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authLoading: false,
          isAuth: false,
          answer: ""
      }
      this.sendAns = this.sendAns.bind(this)
      }

    handleChange(e) {
        let answer = this.state.answer;
        answer = e.target.value
        this.setState({answer : answer});
      }

      sendAns() {
        this.props.onSendAnswer(this.props.question._id, this.state.answer, this.props.history);
        
      }

    render() {
        // const spin = this.props.authLoading ? <Spinner /> : null;
        return (
         <Aux>
             
            {/* {spin} */}
            <div data-aos="fade-up" className={classes.Container}>
                   
                <div className={classes.Login}>
               
                    <h4>Question and Answer</h4>
                    <hr></hr>
                <Form >
                   
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label> {this.props.question.name} </Form.Label>
                            <Form.Control type="text" name="answer" placeholder="Your answer" value={this.state.answer}  onChange={(e) => {this.handleChange(e)}} />
                        </Form.Group> */}
                         <TextField
                          id="filled-password-input"
                          label={this.props.question.name}
                          type="text"
                          name="answer"
                          style={{width: "100%", marginTop: "1em"}} 
                          autoComplete="current-password"
                          variant="outlined"
                          value={this.state.answer}  
                          onChange={(e) => {this.handleChange(e)}} 
                        />




                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button  onClick={this.sendAns} className={classes.LoginBtn}>
                            Submit
                         </Button>
                         </div>
                        
                        </Form>
                </div>
            </div>
            </Aux>
        );
    }

}


const mapStateToProps = state => {
    return {
        question: state.question.question
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendAnswer : (id, answer, history) => dispatch(actions.sendAnswer(id, answer, history))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Otp));