import React, { Component } from "react";
import "./App.css";
class SankeyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // const script = document.createElement("script");
    // script.src = "https://d3js.org/d3.v4.min.js";
    // script.async = true;
    // script.onload = () => this.scriptLoaded();

    // document.body.appendChild(script);
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = window.innerWidth - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = window.d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Color scale used
    var color = window.d3.scaleOrdinal(window.d3.schemeCategory20);

    // Set the sankey diagram properties
    var sankey = window.d3
      .sankey()
      .nodeWidth(36)
      .nodePadding(290)
      .size([width, height]);

    // load the data
    var graph = {
      nodes: [
        {
          node: 0,
          name: "Queens",
        },
        {
          node: 1,
          name: "Manhattan",
        },
        {
          node: 2,
          name: "Brooklyn",
        },
        {
          node: 3,
          name: "Unknown",
        },
        {
          node: 4,
          name: "Bronx",
        },
        {
          node: 5,
          name: "Newark Airport",
        },
        {
          node: 6,
          name: "State Island",
        },
      ],
      links: [
        {
          source: 4,
          target: 2,
          value: 1678 + 1742,
        },
        {
          source: 4,
          target: 5,
          value: 2,
        },
        {
          source: 4,
          target: 1,
          value: 7598 + 12718,
        },
        {
          source: 4,
          target: 0,
          value: 1384 + 1410,
        },
        {
          source: 4,
          target: 6,
          value: 16 + 5,
        },
        {
          source: 4,
          target: 3,
          value: 317 + 49,
        },
        {
          source: 2,
          target: 5,
          value: 67,
        },
        {
          source: 2,
          target: 1,
          value: 16357 + 3470,
        },
        {
          source: 2,
          target: 0,
          value: 7342 + 6648,
        },
        {
          source: 2,
          target: 6,
          value: 130 + 53,
        },
        {
          source: 2,
          target: 3,
          value: 476 + 61,
        },
        {
          source: 5,
          target: 1,
          value: 2 + 88,
        },
        {
          source: 5,
          target: 3,
          value: 1,
        },
        {
          source: 1,
          target: 0,
          value: 4689 + 7154,
        },
        {
          source: 1,
          target: 6,
          value: 14 + 19,
        },
        {
          source: 1,
          target: 3,
          value: 461 + 39,
        },
        {
          source: 0,
          target: 6,
          value: 29 + 27,
        },
        {
          source: 0,
          target: 3,
          value: 911 + 135,
        },
        {
          source: 6,
          target: 3,
          value: 1,
        },
      ],
    };

    // Constructs a new Sankey generator with the default settings.
    sankey.nodes(graph.nodes).links(graph.links).layout(1);

    var tooltip = window.d3
      .select("#my_dataviz")
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
          d.source.name + " - " + d.target.name + "<br />" + "Trips: " + d.value
        )
        .style("left", window.d3.mouse(this)[0] + 30 + "px")
        .style("top", window.d3.mouse(this)[1] + 320 + "px");
    };
    var moveTooltip = function (d) {
      tooltip
        .style("left", window.d3.mouse(this)[0] + 30 + "px")
        .style("top", window.d3.mouse(this)[1] + 320 + "px");
    };
    var hideTooltip = function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    // add in the links
    var link = svg
      .append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankey.link())
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    // add in the nodes
    var node = svg
      .append("g")
      .selectAll(".node")
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .call(
        window.d3
          .drag()
          .subject(function (d) {
            return d;
          })
          .on("start", function () {
            this.parentNode.appendChild(this);
          })
          .on("drag", dragmove)
      );

    // add the rectangles for the nodes
    node
      .append("rect")
      .attr("height", function (d) {
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", "#B1C578")
      .style("stroke", function (d) {
        return window.d3.rgb(d.color).darker(2);
      });
    // Add hover text
    node.append("title").text(function (d) {
      return d.name + d.value;
    });

    // add in the title for the nodes
    node
      .append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    // the function for moving the nodes
    function dragmove(d) {
      window.d3
        .select(this)
        .attr(
          "transform",
          "translate(" +
            d.x +
            "," +
            (d.y = Math.max(0, Math.min(height - d.dy, window.d3.event.y))) +
            ")"
        );
      sankey.relayout();
      link.attr("d", sankey.link());
    }
  }
  render() {
    return <div id="my_dataviz"></div>;
  }
}
export default SankeyChart;
