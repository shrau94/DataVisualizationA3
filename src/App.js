import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BarChart from "./BarChart";
import HeaderKPI from "./HeaderKPI";
import Legend from "./Legend";

function App() {
  return (
    <div className="dv-3">
      <div>
        <h1>Trips in New York city in December 2019</h1>
        <HeaderKPI />
        <Legend> </Legend>
        <BarChart />
      </div>
    </div>
  );
}

export default App;
