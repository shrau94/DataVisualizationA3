import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HeaderKPI from "./HeaderKPI";
import Legend from "./Legend";
import SankeyChart from "./SankeyChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import StackedChart from "./StackedChart";

function App() {
  const styles = {
    align: {
      textAlign: "center",
    },
  };
  return (
    <div className="dv-3">
      <div>
        <div style={styles.align}>
          <h1>TAXI TRIPS IN NEW YORK CITY</h1>
          <h2>DECEMBER 2019</h2>
        </div>
        <HeaderKPI></HeaderKPI>
        <Legend> </Legend>
        <SankeyChart></SankeyChart>
        <BubbleChart></BubbleChart>
        <StackedChart></StackedChart>
        <BarChart></BarChart>
      </div>
    </div>
  );
}

export default App;
