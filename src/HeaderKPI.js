import React, { Component } from "react";
import "./App.css";
import HorizontalBar from "./HorizontalBar";
import DonutChart from "./DonutChart";

class HeaderKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      flexDisplay: {
        display: "flex",
        justifyItems: "center",
        margin: "20px",
      },
      minimumWidth: {
        minWidth: window.innerWidth / 4,
        minHeight: "100px",
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
    const paymentDataYellow = { percent: 71, other: 100 - 71 };
    const paymentDataGreen = { percent: 53, other: 100 - 53 };
    return (
      <div style={styles.flexDisplay}>
        <div style={styles.minimumWidth}>
          Trips per day
          <HorizontalBar data={tripsPerDayData}></HorizontalBar>
        </div>
        <div style={styles.minimumWidth}>
          Average minutes per trip
          <HorizontalBar data={avgMinsPerTripData}></HorizontalBar>
        </div>
        <div style={styles.minimumWidth}>
          Trip payment using credit card
          <div style={styles.dispFlex}>
            <DonutChart
              data={paymentDataGreen}
              middleText={paymentDataGreen.percent + "%"}
              color={"#B1C578"}
            ></DonutChart>
            <DonutChart
              data={paymentDataYellow}
              middleText={paymentDataYellow.percent + "%"}
              color={"#FFFFA0"}
            ></DonutChart>
          </div>
        </div>
        <div style={styles.minimumWidth}>2345</div>
      </div>
    );
  }
}
export default HeaderKPI;
