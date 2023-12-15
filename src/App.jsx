import { useEffect } from "react";
import { getScores } from "./services/getScores";
import { useState } from "react";

function App() {
  const [scores, setScores] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(
    function () {
      getScores().then((data) => setScores(data));
    },
    [refresh]
  );
  function formatDateAndAddTime(inputDate) {
    const originalDate = new Date(inputDate);
    const formattedDate = `${pad(originalDate.getHours())}:${pad(
      originalDate.getMinutes()
    )}:${pad(originalDate.getSeconds())} ${pad(originalDate.getDate())}/${pad(
      originalDate.getMonth() + 1
    )}/${originalDate.getFullYear()}`;

    return formattedDate;
  }

  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }
  function handleClick() {
    setRefresh((refresh) => refresh + 1);
  }
  return (
    <div>
      <div className="header">
        <h1>MathFest 2023 Demo Scores Table</h1>
        <button onClick={handleClick}>Refresh</button>
      </div>
      <table className="score-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Submitted On</th>
            <th>Name</th>
            <th>EmailID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.id}</td>
              <td>{formatDateAndAddTime(score.submitted_on)}</td>
              <td>{score.name}</td>
              <td>{score.email}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
