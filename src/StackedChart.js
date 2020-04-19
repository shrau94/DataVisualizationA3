import React, { Component } from "react";
import "./App.css";
import greenTaxiData from "./data/greenTaxiData.json";
import yellowTaxiData from "./data/yellowTaxiData.json";
import InfoIcon from "./InfoIcon";
import ReactTooltip from "react-tooltip";
class StackedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var taxiType = this.props.taxi;

    //Read the data
    var data = [];
    var domain = 0;
    var color1 = "";
    if (taxiType === "green") {
      data = greenTaxiData;
      domain = 300000;
      color1 = "#B1C578";
    } else {
      data = yellowTaxiData;
      color1 = "#FFFFA0";
      domain = 5000000;
    }

    var margin = { top: 50, right: 70, bottom: 60, left: 90 },
      width = window.innerWidth - margin.left - margin.right - 60,
      height = 400 - margin.top - margin.bottom;

    var svg = window.d3
      .select("#stackedChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = window.d3
      .select("#stackedChart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#e6e6e6")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("position", "absolute")
      .style("color", "black")
      .style("box-shadow", "#a3a3a3 2px 2px");

    var showTooltip = function (d) {
      tooltip.transition().duration(200);
      tooltip
        .style("opacity", 1)
        .html(
          "Start time: " +
            d.data.start_time +
            "<br />" +
            "Fare: " +
            d.data.fare_amount.toFixed(2) +
            "<br />" +
            "Tip: " +
            d.data.tip_amount.toFixed(2) +
            "<br />"
        )
        .style("left", window.d3.mouse(this)[0] + 150 + "px")
        .style("top", window.d3.mouse(this)[1] + 1700 + "px");
    };
    var moveTooltip = function (d) {
      tooltip
        .style("left", window.d3.mouse(this)[0] + 150 + "px")
        .style("top", window.d3.mouse(this)[1] + 1700 + "px");
    };
    var hideTooltip = function (d) {
      tooltip.transition().duration(400).style("opacity", 0);
    };

    var subgroups = ["fare_amount", "tip_amount"];

    var color = window.d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#e1e1dd", color1]);

    var x = window.d3.scaleTime().range([0, width]);
    var y = window.d3.scaleLinear().domain([0, domain]).range([height, 0]);

    var parseTime = window.d3.timeFormat("%Y-%m-%d");
    data.forEach(function (d) {
      d.date = parseTime(new Date(d.start_time));
      d.fare_amount = +d.fare_amount;
      d.tip_amount = +d.tip_amount;
      d.percent = ((d.tip_amount / d.fare_amount) * 100).toFixed(2);
    });
    x.domain(
      window.d3.extent(data, function (d) {
        return new Date(d.start_time);
      })
    );
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(
        window.d3.axisBottom(x).tickFormat(window.d3.timeFormat("%Y-%m-%d"))
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .attr("dx", "3em")
      .attr("dy", "2em")
      .attr("transform", "rotate(0)");

    svg
      .append("g")
      .attr("class", "axis")
      .call(window.d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    var stackedData = window.d3.stack().keys(subgroups)(data);

    var bars = svg
      .append("g")
      .selectAll("g")

      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", function (d) {
        return color(d.key);
      })
      .selectAll("rect")

      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(new Date(d.data.start_time));
      })
      .attr("y", function (d) {
        return y(0);
      })
      .attr("height", 0)
      .attr("width", 30)
      .text(function (d) {
        return d.data.percent;
      })
      .style("stroke", "black")
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);

    bars
      .transition()
      .duration(500)
      .delay(function (d, i) {
        return i * 500;
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      });

    svg
      .selectAll("text.bar")
      .attr("class", "bar")
      .data(data)
      .enter()
      .append("text")
      .style("font-size", 12)
      .attr("fill", "black")
      .attr("x", function (d) {
        return x(new Date(d.start_time));
      })
      .attr("y", function (d) {
        return y(d.fare_amount + d.tip_amount) - 10;
      })
      .transition()
      .duration(500)
      .delay(function (d, i) {
        return i * 500;
      })
      .text(function (d) {
        return d.percent + "%";
      });
    var labelPosition = 1180;
    svg
      .append("text")
      .attr("x", labelPosition - 80)
      .attr("y", 50)
      .text("Percentage of tip earned")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle")
      .style("stroke-dasharray", "2,2");

    svg
      .append("line") //making a line for legend
      .attr("x1", labelPosition - 30)
      .attr("x2", labelPosition - 30)
      .attr("y1", 60)
      .attr("y2", 120)
      .style("stroke-dasharray", "5,5") //dashed array for line
      .style("stroke", "black");

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 5)
      .text("Day in the month of 2019");

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top + 20)
      .text("Total earnings on a day (Fare + Tip)");

    svg
      .append("circle")
      .attr("cx", labelPosition - 50)
      .attr("cy", 0)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", color1);
    svg
      .append("circle")
      .attr("cx", labelPosition - 50)
      .attr("cy", 20)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", "#e1e1dd");
    svg
      .append("text")
      .attr("x", labelPosition - 30)
      .attr("y", 0)
      .text("Total Tip")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", labelPosition - 30)
      .attr("y", 20)
      .text("Total Fare")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
  }
  render() {
    const styles = {
      stackedStyle: {
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "#e4e4e4 2px 2px",
      },
      headingStyle: {
        padding: "10px",
        margin: "10px",
        fontSize: "20px",
      },
      float: {
        float: "right",
      },
    };
    const infoContent =
      "This Stacked Bar Chart shows the  <br /> financial gains by the taxis. <br /> These gains include both the total fare <br /> and the total tips acquired. <br /> The percentages shown above the bars <br /> are the percentage of tips out of overall gains. ";
    return (
      <div style={styles.stackedStyle}>
        <div>
          <div style={styles.headingStyle}>
            Total fare and the tips earned
            <div data-tip={infoContent} style={styles.float}>
              <InfoIcon></InfoIcon>
            </div>
            <ReactTooltip
              type="light"
              border={true}
              borderColor="black"
              html={true}
            />
          </div>
        </div>
        <div id="stackedChart"></div>
      </div>
    );
  }
}
export default StackedChart;
