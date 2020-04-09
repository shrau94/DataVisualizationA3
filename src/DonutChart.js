import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var width = 100;
    var height = 100;
    var margin = 5;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select(this.refs.donutChart)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = this.props.data;

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(data)
      .range([this.props.color, "#FFFFFF"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) {
      return d.value;
    });
    var data_ready = pie(d3.entries(data));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(20) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", function (d) {
        return color(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "label")
      .attr("y", 5)
      .text(this.props.middleText);
  }

  render() {
    return <div ref="donutChart"></div>;
  }
}
export default DonutChart;
