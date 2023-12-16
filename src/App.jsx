import { useEffect } from "react";
import { getScores } from "./services/getScores";
import { useState } from "react";
import * as XLSX from "xlsx";

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
  const handleGenerate = function () {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      scores.map((score) => ({
        ...score,
        submitted_on: formatDateAndAddTime(score.submitted_on),
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, "MathFest2023_Scores.xlsx");
  };

  return (
    <div>
      <div className="header">
        <h1>MathFest 2023 Scores Table</h1>
        <button onClick={handleClick}>Refresh</button>
        <button onClick={handleGenerate}>Export to Excel</button>
      </div>
      <table className="score-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Submitted On</th>
            <th>College</th>
            <th>Name</th>
            <th>EmailID</th>
            <th>Time Taken</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.id}</td>
              <td>{formatDateAndAddTime(score.submitted_on)}</td>
              <td>{score.college}</td>
              <td>{score.name}</td>
              <td>{score.email}</td>
              <td>{score.timeTaken}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
