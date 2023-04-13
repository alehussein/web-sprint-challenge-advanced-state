import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

export default function Quiz(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);
  

  const handleAnswerSelection = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      dispatch(postAnswer(selectedAnswer, quiz.quiz_id));
    }
  };

 

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map(answer => (
                <div className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`} key={answer.answer_id}>
                  {answer.text}
                  <button onClick={() => handleAnswerSelection(answer.answer_id)}>
                    {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  );
}