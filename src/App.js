import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "./logo.svg";
import "./App.css";
import HeaderKPI from "./HeaderKPI";
import SankeyChart from "./SankeyChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import StackedChart from "./StackedChart";

function App() {
  const styles = {
    align: {
      textAlign: "center",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "#e4e4e4 2px 2px",
      padding: "10px",
      margin: "20px",
      fontSize: "28px",
    },
    tabStyle: {
      margin: "20px",
    },
  };
  return (
    <div className="dv-3">
      <div>
        <div style={styles.align}>
          Green and Yellow Taxis in New York in December 2019
        </div>
        <HeaderKPI></HeaderKPI>
        <div style={styles.tabStyle}>
          <Tabs>
            <TabList>
              <Tab>Yellow Taxis</Tab>
              <Tab>Green Taxis</Tab>
            </TabList>
            <TabPanel>
              <SankeyChart taxi="yellow"></SankeyChart>
              <BubbleChart taxi="yellow"></BubbleChart>
              <StackedChart taxi="yellow"></StackedChart>
            </TabPanel>
            <TabPanel>
              <SankeyChart taxi="green"></SankeyChart>
              <BubbleChart taxi="green"></BubbleChart>
              <StackedChart taxi="green"></StackedChart>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
