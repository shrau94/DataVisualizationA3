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
      .attr("width", window.innerWidth)
      .attr("height", 50);
    var widthBuffer = window.innerWidth / 2 - 170;
    svg
      .append("circle")
      .attr("cx", widthBuffer + 20)
      .attr("cy", 20)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", "#B1C578");
    svg
      .append("circle")
      .attr("cx", widthBuffer + 150)
      .attr("cy", 20)
      .attr("r", 6)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("fill", "#FFFFA0");
    svg
      .append("text")
      .attr("x", widthBuffer + 40)
      .attr("y", 20)
      .text("Green Taxis")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", widthBuffer + 170)
      .attr("y", 20)
      .text("Yellow Taxis")
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
