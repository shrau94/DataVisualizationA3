import React, { Component } from "react";
import "./App.css";
import greenTaxiData from "./data/greenTaxiData.json";
import yellowTaxiData from "./data/yellowTaxiData.json";
import InfoIcon from "./InfoIcon";
import ReactTooltip from "react-tooltip";
class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var taxiType = this.props.taxi;

    var margin = { top: 50, right: 50, bottom: 60, left: 90 },
      width = window.innerWidth - margin.left - margin.right - 60,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = window.d3
      .select("#bubbleChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    var data = [];
    var color = "";
    var domain = 0;
    var bubbleRange = 0;
    if (taxiType === "green") {
      data = greenTaxiData;
      color = "#B1C578";
      domain = 136802;
      bubbleRange = 250;
    } else {
      data = yellowTaxiData;
      color = "#FFFFA0";
      domain = 840000;
      bubbleRange = 70;
    }

    var tooltip = window.d3
      .select("#bubbleChart")
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
            d.start_time +
            "<br />" +
            "Trip distance: " +
            d.trip_distance.toFixed(2) +
            "<br />" +
            "Passenger count: " +
            d.passenger_count +
            "<br />"
        )
        .style("left", window.d3.mouse(this)[0] + 150 + "px")
        .style("top", window.d3.mouse(this)[1] + 1100 + "px");
    };
    var moveTooltip = function (d) {
      tooltip
        .style("left", window.d3.mouse(this)[0] + 150 + "px")
        .style("top", window.d3.mouse(this)[1] + 1100 + "px");
    };
    var hideTooltip = function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    // Add X axis
    var x = window.d3.scaleTime().range([0, width]);
    var y = window.d3.scaleLinear().domain([0, domain]).range([height, 0]);
    var z = window.d3.scaleLinear().domain([0, domain]).range([1, bubbleRange]);

    svg.append("g").attr("transform", "translate(0," + height + ")");

    var parseTime = window.d3.timeFormat("%Y-%m-%d");
    data.forEach(function (d) {
      d.date = parseTime(new Date(d.start_time));
      d.trip_distance = +d.trip_distance;
    });
    x.domain(
      window.d3.extent(data, function (d) {
        return new Date(d.date);
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

    var valueline = window.d3
      .line()
      .x(function (d) {
        return x(new Date(d.date));
      })
      .y(function (d) {
        return y(d.trip_distance);
      });

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "black")
      .style("fill", "#e1e1dd")
      .attr("d", valueline);

    y.domain([
      0,
      window.d3.max(data, function (d) {
        return d.trip_distance;
      }),
    ]);

    svg
      .append("g")
      .attr("class", "axis")
      .call(window.d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // Add a scale for bubble size

    // Add dots
    var bubbles = svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(new Date(d.date));
      })
      .attr("cy", function (d) {
        return y(d.trip_distance);
      })
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);

    bubbles
      .transition()
      .duration(500)
      .attr("r", function (d) {
        return z(d.passenger_count);
      })
      .delay(function (d, i) {
        return i * 500;
      })
      .style("fill", color)
      .style("opacity", "0.8")
      .attr("stroke", "black");
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
      .attr("x", -margin.top)
      .text("Total trip distance on a day");
    // var height = 150;
    // var width = 250;
    // var svg = window.d3
    //   .select("#my_dataviz")
    //   .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    // The scale you use for bubble size
    var size = window.d3.scaleSqrt().domain([0, domain]).range([1, 38]); // Size in pixel

    // Add legend: circles
    var valuesToShow = [domain, domain / 2];
    var xCircle = 1180;
    var xLabel = 1240;
    var yCircle = 90;
    svg
      .append("text")
      .attr("x", xCircle - 30)
      .attr("y", 0)
      .text("Passenger count")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
      .attr("cx", xCircle)
      .attr("cy", function (d) {
        return yCircle - size(d);
      })
      .attr("r", function (d) {
        return size(d);
      })
      .style("fill", color)
      .style("opacity", "0.8")
      .attr("stroke", "black");

    // Add legend: segments
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return xCircle + size(d);
      })
      .attr("x2", xLabel)
      .attr("y1", function (d) {
        return yCircle - size(d);
      })
      .attr("y2", function (d) {
        return yCircle - size(d);
      })
      .style("fill", color)
      .attr("stroke", "black")
      .style("stroke-dasharray", "2,2");

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
      .attr("x", xLabel)
      .attr("y", function (d) {
        return yCircle - size(d);
      })
      .text(function (d) {
        return d;
      })
      .style("font-size", 12)
      .attr("alignment-baseline", "middle");
  }
  render() {
    const styles = {
      bubbleStyle: {
        marginTop: "20px",
        marginBottom: "10px",
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
      "This Bubble Chart shows the total distance  <br /> covered by all the taxis in a day. <br /> The bubble represents the total <br /> number of passengers per day. <br /> The size of the bubble is proportional <br /> to the number of passengers. ";
    return (
      <div style={styles.bubbleStyle}>
        <div>
          <div style={styles.headingStyle}>
            Trip distance and the passenger count for each day
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
        <div id="bubbleChart"></div>
      </div>
    );
  }
}
export default BubbleChart;
