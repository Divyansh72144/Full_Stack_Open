import { useState } from "react";
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [allClicks, setAll] = useState([]);

  const StatisticLine = ({ text, value }) => {
    return (
      <div>
        {text}
        {value}
      </div>
    );
  };

  const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
  };

  const Statistics = ({ good, bad, neutral, total }) => {
    const Average = (good - bad) / 10 || 0;
    const Positive = (good * 100) / total || 0;
    console.log(Average, Positive);
    if (good === 0 && neutral === 0 && bad === 0) {
      return <p>No feedback given</p>;
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="good" value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="neutral" value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="bad" value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="all" value={total} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Average" value={Average} />
              </td>
            </tr>

            <tr>
              <td>
                <StatisticLine text="Positive" value={Positive} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const goodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
    setAll(allClicks.concat("G"));
  };

  const neutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good + updatedNeutral + bad);
    setAll(allClicks.concat("N"));
  };

  const badClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
    setAll(allClicks.concat("B"));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={goodClick}></Button>
      <Button text="neutral" handleClick={neutralClick}></Button>
      <Button text="bad" handleClick={badClick}></Button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
