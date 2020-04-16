import React, { Component } from "react";
import "./App.css";
class StackedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //Read the data
    var data = [
      {
        start_time: "2019-12-01",
        trip_distance: 32156.3400000001,
        passenger_count: 13048,
        fare_amount: 153787.8199999999,
        tip_amount: 11013.21,
        year: "2019",
      },
      {
        start_time: "2019-12-02",
        trip_distance: 45471.7100000001,
        passenger_count: 14714,
        fare_amount: 206936.7300000024,
        tip_amount: 12935.13,
        year: "2019",
      },
      {
        start_time: "2019-12-03",
        trip_distance: 52533.1900000002,
        passenger_count: 15462,
        fare_amount: 242161.6100000022,
        tip_amount: 14416.29,
        year: "2019",
      },
      {
        start_time: "2019-12-04",
        trip_distance: 56757.4100000001,
        passenger_count: 15946,
        fare_amount: 260132.2900000032,
        tip_amount: 15111.55,
        year: "2019",
      },
      {
        start_time: "2019-12-05",
        trip_distance: 136802.1699999998,
        passenger_count: 17043,
        fare_amount: 282098.5200000037,
        tip_amount: 17254.0599999999,
        year: "2019",
      },
      {
        start_time: "2019-12-06",
        trip_distance: 49592.8399999998,
        passenger_count: 18307,
        fare_amount: 283350.6100000018,
        tip_amount: 17262.2899999999,
        year: "2019",
      },
      {
        start_time: "2019-12-07",
        trip_distance: 49347.6600000001,
        passenger_count: 18704,
        fare_amount: 241445.250000002,
        tip_amount: 18406.8899999998,
        year: "2019",
      },
      {
        start_time: "2019-12-08",
        trip_distance: 42533.7399999999,
        passenger_count: 14114,
        fare_amount: 206689.6600000007,
        tip_amount: 13501.7199999999,
        year: "2019",
      },
      {
        start_time: "2019-12-09",
        trip_distance: 45562.4,
        passenger_count: 15089,
        fare_amount: 239994.790000002,
        tip_amount: 14143.58,
        year: "2019",
      },
      {
        start_time: "2019-12-10",
        trip_distance: 51029.2800000001,
        passenger_count: 15528,
        fare_amount: 261113.7200000017,
        tip_amount: 14641.34,
        year: "2019",
      },
      {
        start_time: "2019-12-11",
        trip_distance: 51565.36,
        passenger_count: 15717,
        fare_amount: 258267.2800000006,
        tip_amount: 15168.7999999999,
        year: "2019",
      },
      {
        start_time: "2019-12-12",
        trip_distance: 55191.08,
        passenger_count: 17469,
        fare_amount: 285828.3100000031,
        tip_amount: 16955.67,
        year: "2019",
      },
      {
        start_time: "2019-12-13",
        trip_distance: 56284.1399999997,
        passenger_count: 19186,
        fare_amount: 280918.3000000017,
        tip_amount: 18563.19,
        year: "2019",
      },
      {
        start_time: "2019-12-14",
        trip_distance: 51673.8199999999,
        passenger_count: 17913,
        fare_amount: 246155.1600000017,
        tip_amount: 17979.89,
        year: "2019",
      },
      {
        start_time: "2019-12-15",
        trip_distance: 45315.09,
        passenger_count: 14915,
        fare_amount: 213129.7299999998,
        tip_amount: 14619.76,
        year: "2019",
      },
      {
        start_time: "2019-12-16",
        trip_distance: 49353.36,
        passenger_count: 15353,
        fare_amount: 243800.1100000012,
        tip_amount: 14291.76,
        year: "2019",
      },
      {
        start_time: "2019-12-17",
        trip_distance: 52190.1999999998,
        passenger_count: 15744,
        fare_amount: 248104.8400000004,
        tip_amount: 15161.36,
        year: "2019",
      },
      {
        start_time: "2019-12-18",
        trip_distance: 55838.7499999997,
        passenger_count: 15944,
        fare_amount: 264761.2599999998,
        tip_amount: 15777.2,
        year: "2019",
      },
      {
        start_time: "2019-12-19",
        trip_distance: 58888.1100000003,
        passenger_count: 17821,
        fare_amount: 272830.1500000001,
        tip_amount: 18218.9,
        year: "2019",
      },
      {
        start_time: "2019-12-20",
        trip_distance: 58468.5599999999,
        passenger_count: 17924,
        fare_amount: 273822.6499999994,
        tip_amount: 17385.3299999999,
        year: "2019",
      },
      {
        start_time: "2019-12-21",
        trip_distance: 50394.9499999997,
        passenger_count: 16274,
        fare_amount: 222349.9900000008,
        tip_amount: 14449.9199999999,
        year: "2019",
      },
      {
        start_time: "2019-12-22",
        trip_distance: 41913.49,
        passenger_count: 12615,
        fare_amount: 185189.8800000004,
        tip_amount: 10810.98,
        year: "2019",
      },
      {
        start_time: "2019-12-23",
        trip_distance: 47129.7700000001,
        passenger_count: 14409,
        fare_amount: 213879.840000001,
        tip_amount: 11506.8099999999,
        year: "2019",
      },
      {
        start_time: "2019-12-24",
        trip_distance: 42650.0600000001,
        passenger_count: 14824,
        fare_amount: 191476.8100000006,
        tip_amount: 9884.3,
        year: "2019",
      },
      {
        start_time: "2019-12-25",
        trip_distance: 30991.35,
        passenger_count: 8305,
        fare_amount: 126261.4599999993,
        tip_amount: 6444.6,
        year: "2019",
      },
      {
        start_time: "2019-12-26",
        trip_distance: 29560.7799999999,
        passenger_count: 11707,
        fare_amount: 170117.9400000004,
        tip_amount: 9210.98,
        year: "2019",
      },
      {
        start_time: "2019-12-27",
        trip_distance: 43891.8300000001,
        passenger_count: 12971,
        fare_amount: 194864.0899999997,
        tip_amount: 9969.5,
        year: "2019",
      },
      {
        start_time: "2019-12-28",
        trip_distance: 42700.63,
        passenger_count: 13541,
        fare_amount: 185070.8200000002,
        tip_amount: 10983.17,
        year: "2019",
      },
      {
        start_time: "2019-12-29",
        trip_distance: 38450.5200000001,
        passenger_count: 11565,
        fare_amount: 170229.6699999997,
        tip_amount: 9848.49,
        year: "2019",
      },
      {
        start_time: "2019-12-30",
        trip_distance: 41725.7099999998,
        passenger_count: 13557,
        fare_amount: 189995.3100000011,
        tip_amount: 10168.98,
        year: "2019",
      },
      {
        start_time: "2019-12-31",
        trip_distance: 46312.4200000001,
        passenger_count: 16256,
        fare_amount: 208372.0700000011,
        tip_amount: 11740.19,
        year: "2019",
      },
    ];

    var margin = { top: 70, right: 70, bottom: 40, left: 70 },
      width = window.innerWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
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
      console.log(d);
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
        .style("left", window.d3.mouse(this)[0] + 80 + "px")
        .style("top", window.d3.mouse(this)[1] + 1400 + "px");
    };
    var moveTooltip = function (d) {
      tooltip
        .style("left", window.d3.mouse(this)[0] + 80 + "px")
        .style("top", window.d3.mouse(this)[1] + 1400 + "px");
    };
    var hideTooltip = function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
    };
    // Parse the Data

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ["fare_amount", "tip_amount"];

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    // var groups = window.d3.map(data, function (d) {
    //   return new Date(d.start_time);
    // });

    // window.d3.layout.stack(data);

    var color = window.d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#a3a3a3", "#B1C578"]);

    var x = window.d3.scaleTime().range([0, width]);
    var y = window.d3.scaleLinear().domain([0, 300000]).range([height, 0]);

    svg.append("g").attr("transform", "trans÷late(0," + height + ")");

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
    console.log(data);
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
    // Add Y axis

    // y.domain([
    //   0,
    //   window.d3.max(data, function (d) {
    //     return d.fare_amount + d.tip_amount;
    //   }),
    // ]);
    svg
      .append("g")
      .attr("class", "axis")
      .call(window.d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // color palette = one color per subgroup

    //stack the data? --> stack per subgroup
    var stackedData = window.d3.stack().keys(subgroups)(data);
    console.log(stackedData);
    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", function (d) {
        return color(d.key);
      })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(new Date(d.data.start_time));
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", 30)
      .text(function (d) {
        return d.data.percent;
      })
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);
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
      .text(function (d) {
        return d.percent + "%";
      });
  }
  render() {
    return <div id="stackedChart"></div>;
  }
}
export default StackedChart;
