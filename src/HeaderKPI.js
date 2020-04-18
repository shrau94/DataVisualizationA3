import React, { Component } from "react";
import "./App.css";
import HorizontalBar from "./HorizontalBar";
import DonutChart from "./DonutChart";
import Legend from "./Legend";

class HeaderKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(window.innerWidth);
    const styles = {
      flexDisplay: {
        display: "flex",
        justifyItems: "center",
        margin: "10px",
      },
      legend: {
        minWidth: "100px",
        padding: "10px",
        margin: "10px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "#e4e4e4 2px 2px",
      },
      minimumWidth: {
        minWidth: (window.innerWidth - 20) / 4 - 80,
        minHeight: "100px",
        padding: "10px",
        margin: "10px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "#e4e4e4 2px 2px",
      },
      dispFlex: {
        display: "flex",
      },
    };
    const tripsPerDayData = [
      {
        name: "Green",
        value: 11598,
      },
      {
        name: "Yellow",
        value: 220786,
      },
    ];
    const avgMinsPerTripData = [
      {
        name: "Green",
        value: 13.6,
      },
      {
        name: "Yellow",
        value: 15,
      },
    ];
    const fareEarnedData = [
      {
        name: "Green",
        value: 162078,
      },
      {
        name: "Yellow",
        value: 3806944,
      },
    ];
    const paymentDataYellow = { percent: 71, other: 100 - 71 };
    const paymentDataGreen = { percent: 53, other: 100 - 53 };
    return (
      <div style={styles.flexDisplay}>
        <div style={styles.minimumWidth}>
          Total trips per day
          <HorizontalBar data={tripsPerDayData}></HorizontalBar>
        </div>
        <div style={styles.minimumWidth}>
          Payment made with credit card
          <div style={styles.dispFlex}>
            <DonutChart
              data={paymentDataYellow}
              middleText={paymentDataYellow.percent + "%"}
              color={"#FFFFA0"}
            ></DonutChart>
            <DonutChart
              data={paymentDataGreen}
              middleText={paymentDataGreen.percent + "%"}
              color={"#B1C578"}
            ></DonutChart>
          </div>
        </div>
        <div style={styles.minimumWidth}>
          Total fare per day
          <HorizontalBar data={fareEarnedData}></HorizontalBar>
        </div>
        <div style={styles.minimumWidth}>
          Average minutes per trip
          <HorizontalBar data={avgMinsPerTripData}></HorizontalBar>
        </div>
        <div style={styles.legend}>
          <Legend> </Legend>
        </div>
      </div>
    );
  }
}
export default HeaderKPI;
