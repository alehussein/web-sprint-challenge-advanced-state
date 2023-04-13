import React, {useState, useEffect, useRef} from 'react'
// ------------
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

// ------------

function Wheel(props) {
  
  const cogRefs = useRef([]);
  const [currentCog, setCurrentCog] = useState("B");
  const [activeCogIndex, setActiveCogIndex] = useState(props.wheelValue);
  
  useEffect(() => {
    cogRefs.current.forEach((cog, i) => {
      if (i === activeCogIndex) {
        cog.classList.add('active');
      } else {
        cog.classList.remove('active');
      }
    });
  }, [activeCogIndex]);
  
  useEffect(() => {
    setActiveCogIndex(props.wheelValue);
  }, [props.wheelValue]);
  
  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            style={{ "--i": idx }}
            className={`cog${activeCogIndex === idx ? " active" : ""}`}
            ref={(el) => (cogRefs.current[idx] = el)}
          >
            {activeCogIndex === idx ? currentCog : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise(1)}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise(1)}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheelValue: state.wheel
  };
};

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);

