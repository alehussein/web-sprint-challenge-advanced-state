import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, INPUT_CHANGE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types';
import axios from 'axios';
import { response } from 'msw';



// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(amount) {
  return { type: MOVE_CLOCKWISE, payload: amount};
 }

export function moveCounterClockwise(amount) {
  return {type: MOVE_COUNTERCLOCKWISE, payload: amount};
 }

export function selectAnswer(answer) {
  return {type: SET_SELECTED_ANSWER, payload: answer};
 }

export function setMessage(message) {
  return {type: SET_INFO_MESSAGE, payload: message};
 }

export function setQuiz(quiz) {
  return {type:SET_QUIZ_INTO_STATE, payload: quiz};
 }

export function inputChange(event) {
  return{
    type:INPUT_CHANGE,
    payload: {name: event.target.name, value: event.target.value},
    
  };
  
 }

export function resetForm() {
  return {type: RESET_FORM };
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: 'RESET_FORM' });
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        // console.log("QUIZ ACTION:", res.data);
        dispatch({ type: 'SET_QUIZ_INTO_STATE', payload: res.data });
        
        })
      .catch(err => {
        console.error(err);
      });
  };
}


export function postAnswer(answerId, quizId) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { answer_id: answerId, quiz_id: quizId})
    .then(res => {
      dispatch({type: 'SET_INFO_MESSAGE', payload: res.data.message});
      dispatch(fetchQuiz());
      
    })
    .catch(err => {
      console.log(err);
    })
   
  }
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new',{
      question_text: question_text,
      true_answer_text: true_answer_text,
      false_answer_text: false_answer_text,
    })
    .then(res => {
      console.log("DATA", res.data.question);
      
      dispatch({ type: 'SET_INFO_MESSAGE', payload: `Congrats: "${res.data.question}" is a great question!` });
      dispatch({ type: 'SET_QUIZ_INTO_STATE', payload: res.data});
      dispatch({ type: 'RESET_FORM' });
      
      console.log("Set:", res);
    })
    .catch(err => {
     
      console.log(err);
      dispatch({ type: 'SET_INFO_MESSAGE', payload: response.data.message})
    })
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
