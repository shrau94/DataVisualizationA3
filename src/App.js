import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderKPI from "./HeaderKPI";
import Legend from "./Legend";
import SankeyChart from "./SankeyChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";

function App() {
  return (
    <div className="dv-3">
      <div>
        <h1>Trips in New York city in December 2019</h1>
        <HeaderKPI />
        <Legend> </Legend>
        <SankeyChart></SankeyChart>
        <BubbleChart></BubbleChart>
        <BarChart></BarChart>
      </div>
    </div>
  );
}

export default App;
