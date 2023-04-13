import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { useState } from 'react';

export function Form(props) {
  const [formState, setFormState] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: ''
  });


  const onChange = evt => {
  props.inputChange(evt);

  const { name, value } = event.target;
  setFormState(prevState => ({
    ...prevState,
    [name]: value.trim()
  }));
  }
  

  const onSubmit = evt => {
    evt.preventDefault();
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
    props.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  }

  const isDisabled = !Object.values(formState).every(value => value.trim().length > 1);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question"  value={props.form.newQuestion} name="newQuestion"/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer"  value={props.form.newTrueAnswer} name="newTrueAnswer"/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} name="newFalseAnswer"/>
      <button id="submitNewQuizBtn" disabled={isDisabled}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
