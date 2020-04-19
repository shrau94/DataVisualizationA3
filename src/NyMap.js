import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import InfoIcon from "./InfoIcon";
import ReactTooltip from "react-tooltip";
import React, { Component } from "react";
import "./App.css";
import data from "./data/nyTopoJson.json";

class NyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var taxiType = this.props.taxi;

    var width = window.innerWidth,
      height = 500,
      centered;

    var countGreen = {
      Bronx: 21557,
      "Staten Island": 42,
      Queens: 120730,
      Manhattan: 135833,
      Brooklyn: 96673,
    };
    var opacityMap = {
      Bronx: 0.7,
      "Staten Island": 0.6,
      Queens: 0.9,
      Manhattan: 1,
      Brooklyn: 0.8,
    };
    var countYellow = {
      Bronx: 6077,
      "Staten Island": 107,
      Queens: 151399,
      Manhattan: 5818649,
      Brooklyn: 48212,
    };
    var taxiColor = "";
    var countData;
    if (taxiType === "green") {
      countData = countGreen;
      taxiColor = "#B1C578";
    } else {
      countData = countYellow;
      taxiColor = "#FFFFA0";
    }
    var margin = { top: 0, right: 50, bottom: 0, left: 90 };
    // Define color scale
    var color = window.d3
      .scaleLinear()
      .domain([1, 5818649])
      .clamp(true)
      .range(["#fff", taxiColor]);

    var projection = window.d3
      .geoMercator()
      .scale(45000)
      // Center the Map in Colombia
      .center([-73.935242, 40.73061])
      .translate([width / 2, height / 2]);

    var path = window.d3.geoPath().projection(projection);

    // Set svg width & height
    var svg = window.d3
      .select("#nyMap")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // Add background
    svg
      .append("rect")
      .attr("class", "background")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "white");

    var g = svg.append("g");

    var effectLayer = g.append("g").classed("effect-layer", true);

    var mapLayer = g.append("g").classed("map-layer", true);

    var dummyText = g
      .append("text")
      .classed("dummy-text", true)
      .attr("x", 10)
      .attr("y", 30)
      .style("opacity", 0);

    var bigText = g
      .append("text")
      .classed("big-text", true)
      .attr("x", 20)
      .attr("y", 45);

    // Load map data
    var mapData = data;
    var features = mapData.features;

    // Update color scale domain based on data
    color.domain([0, window.d3.max(features, nameLength)]);

    // Draw each province as a path
    mapLayer
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .style("fill", taxiColor)
      .style("opacity", findOpacity)

      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    mapLayer.selectAll("path").style("stroke", "black");
    function findOpacity(d) {
      // Highlight hovered province
      var n = nameFn(d);
      console.log(opacityMap[n]);
      return opacityMap[n] ? opacityMap[n] : 0;
    }

    function mouseover(d) {
      // Highlight hovered province
      window.d3.select(this).style("fill", "#e1e1dd");
    }
    function mouseout(d) {
      // Reset province color
      mapLayer.selectAll("path").style("fill", taxiColor);
    }

    svg
      .append("text")
      .attr("x", 730)
      .attr("y", 135)
      .text("Bronx: " + countData["Bronx"])
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("x", 530)
      .attr("y", 170)
      .text("Manhattan: " + countData["Manhattan"])
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("x", 770)
      .attr("y", 260)
      .text("Queens: " + countData["Queens"])
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("x", 670)
      .attr("y", 340)
      .text("Brooklyn:")
      .style("font-size", "15px");
    svg
      .append("text")
      .attr("x", 670)
      .attr("y", 360)
      .text(countData["Brooklyn"])
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("x", 380)
      .attr("y", 400)
      .text("Staten Island: " + countData["Staten Island"])
      .style("font-size", "15px");

    // Get province name
    function nameFn(d) {
      return d && d.properties ? d.properties.boro_name : null;
    }

    // Get province name length
    function nameLength(d) {
      var n = nameFn(d);
      return countData[n] ? countData[n] : 0;
    }

    // Get province color
    function fillFn(d) {
      return color(nameLength(d));
    }
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
      "This Map Chart shows the  <br /> inta-borough trips done. <br /> Each borough is shown on the New York city map <br /> and the count of number of trips is shown on it. ";
    return (
      <div style={styles.bubbleStyle}>
        <div>
          <div style={styles.headingStyle}>
            Trips within boroughs
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
        <div id="nyMap"></div>
      </div>
    );
  }
}

export default NyMap;
