import './style/ScoreWPM.css';

const ScoreWPM = (props) => {

  return (
    <div className="wpm-container">
      <span className="wpm-value">
        {props.score} WPM
      </span>
    </div>
  );

}

export default ScoreWPM;

