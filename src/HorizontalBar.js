import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";
class HorizontalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const data = this.props.data;
    const type = this.props.type;
    var margin = {
      top: 15,
      right: 80,
      bottom: 10,
      left: 2,
    };

    var width = 250 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;

    var svg = d3
      .select("#" + type)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "bar")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleLinear()
      .range([0, width])
      .domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ]);

    var y = d3
      .scaleBand()
      .rangeRound([height, 0])
      .domain(
        data.map(function (d) {
          return d.name;
        })
      );

    var bars = svg.selectAll(".bar").data(data).enter().append("g");
    var color = ["#B1C578", "#FFFFA0", "#FFE77AFF", "#2C5F2DFF"];

    bars
      .append("rect")
      .attr("class", "sBar")
      .attr("fill", function (d, i) {
        return color[i];
      })
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("height", y.bandwidth() - 5)
      .attr("x", 0)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .attr("width", function (d) {
        return x(d.value);
      });

    bars
      .append("text")
      .attr("class", "label")
      .attr("y", function (d) {
        return y(d.name) + y.bandwidth() / 2 + 4;
      })
      .attr("x", function (d) {
        return x(d.value) + 3;
      })
      .text(function (d) {
        return d.value;
      });
  }
  render() {
    const styles = {
      container: {
        display: "grid",
      },
    };
    const type = this.props.type;
    return <div id={type} style={styles.container}></div>;
  }
}
export default HorizontalBar;
