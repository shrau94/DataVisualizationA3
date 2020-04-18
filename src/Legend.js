import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var svg = d3
      .select(this.refs.legend)
      .attr("width", 120)
      .attr("height", 100);
    var widthBuffer = 0;
    svg
      .append("circle")
      .attr("cx", widthBuffer + 10)
      .attr("cy", 40)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", "#FFFFA0");
    svg
      .append("circle")
      .attr("cx", widthBuffer + 10)
      .attr("cy", 80)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", "#B1C578");
    svg
      .append("text")
      .attr("x", widthBuffer + 30)
      .attr("y", 40)
      .text("Yellow Taxis")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", widthBuffer + 30)
      .attr("y", 80)
      .text("Green Taxis")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
  }

  render() {
    return (
      <div>
        <svg ref="legend"> </svg>
      </div>
    );
  }
}
export default Legend;
