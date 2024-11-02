import "./score.css";

const Score = ({ score, highScore }) => {
  return (
    <>
      <div className="cards">
        <h3>Your Score is : {score}</h3>

        <h3>High Score: {highScore}</h3>
      </div>
    </>
  );
};

export default Score;
