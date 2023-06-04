import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h3>
        Advice #{" "}
        {data ? <span>{data.slip.id}</span> : <span>Loading data...</span>}
      </h3>

      <blockquote>{data ? <q>{data.slip.advice}</q> : <q>Loading data...</q>}</blockquote>
      <div className="divider">
        <span className="line"></span>
        <img src="/images/pattern-divider-desktop.svg" alt="divider" />
        <span className="line"></span>
      </div>
      <div className="icon">
        <a href="reload">
          <img src="/images/icon-dice.svg" alt="icon" />
        </a>
      </div>
    </div>
  );
}

export default App;
