import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import HeaderKPI from "./HeaderKPI";
import SankeyChart from "./SankeyChart";
import BubbleChart from "./BubbleChart";
import StackedChart from "./StackedChart";
import NyMap from "./NyMap";

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
    paragraph: {
      textAlign: "left",
      fontSize: "14px",
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
          <p style={styles.paragraph}>
            This visualization showcases the analysis of the data available for
            the New York green and yellow taxis. The timeframe chosen for
            analysis is December 2019 and is taken from the New York Taxi's open
            database -
            <a
              href="https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page"
              target="_blank"
              rel="noopener noreferrer"
            >
              New York City Taxi and Limousine Commission
            </a>
            . New York is divided into six boroughs namely: Bronx, Brooklyn,
            Newark airport, Manhattan and Queens. The analysis mainly focuses on
            the trend observed during the holiday month with respect to the
            number of trips between boroughs, total distance covered and daily
            financial gains. The first section of the visualization covers the
            higher-level observations and the other charts cover the details.
          </p>
        </div>
        <HeaderKPI></HeaderKPI>
        <div style={styles.tabStyle}>
          <Tabs>
            <TabList>
              <Tab>Yellow Taxis</Tab>
              <Tab>Green Taxis</Tab>
            </TabList>
            <TabPanel>
              <BubbleChart taxi="yellow"></BubbleChart>
              <StackedChart taxi="yellow"></StackedChart>
              <SankeyChart taxi="yellow"></SankeyChart>
              <NyMap taxi="yellow"></NyMap>
            </TabPanel>
            <TabPanel>
              <BubbleChart taxi="green"></BubbleChart>
              <StackedChart taxi="green"></StackedChart>
              <SankeyChart taxi="green"></SankeyChart>
              <NyMap taxi="green"></NyMap>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
