import { useRef, useEffect } from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";

import '../../App.css'

const MAX_STAT = 200;

function BarChart({ height = 500, width = 1000 }) {
  const svgRef = useRef(null);

  const data = [
    {label: 'A', value: 20},
    {label: 'B', value: -9},
    {label: 'C', value: 40},
    {label: 'D', value: 5},
    {label: 'E', value: 23},
    {label: 'F', value: 31},
    {label: 'G', value: 15},
    {label: 'H', value: 80},
    {label: 'I', value: 150},
    {label: 'J', value: 40},
    {label: 'K', value: 200},
  ];

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, MAX_STAT])
      .range([height, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((_, index) => data[index].label);

    svg
      .select("#x-axis")
      .style("transform", `translateY(${height}px)`)
      .style("font-size", '16px')
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg
      .select("#y-axis")
      .style("font-size", '16px')
      .call(yAxis);

    svg.selectAll('g.tick');

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (_, index) => xScale(index.toString()))
  .attr("y", -height)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill","#0072BD")
      .attr("height", (value) => height - yScale(value.value));

    svg
      .selectAll(".bar")
      .append('text')
      .text('score')
  }, [data]);

  return (
    <svg className="barChart" ref={svgRef} style={{ height: `${height}px`, width: `${width}px` }}>
      <g id="x-axis" />
      <g id="y-axis" />
    </svg>
  );
}

export default BarChart;