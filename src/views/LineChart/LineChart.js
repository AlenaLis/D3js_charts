import React, { useRef, useEffect } from "react";
import {
    select,
    line,
    curveCardinal,
    scaleLinear,
    axisBottom,
    axisLeft,
} from "d3";
const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 25 },
    { x: 4, y: 30 },
];

const LineChart = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300]);

        const yScale = scaleLinear().domain([0, 100]).range([100, 0]);

        const xAxis = axisBottom(xScale).ticks(data.length);
        svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

        const myLine = line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d.y))
            .curve(curveCardinal);

        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "#00bfa6");
        svg
            .selectAll('.legends')
            .data([data])
            .join('rect')
            .attr('transform', `translate(${2000 - 2000 * 0.25})`)
            .attr('y', (d, i) => i * 15 + 10)
            .attr('width', 12)
            .attr('height', 12)
            .style('fill', (d) => d?.data?.fillColor);

        svg
            .selectAll('.legends-text')
            .data([data])
            .join('text')
            .attr('transform', `translate(${2000 - 2000 * 0.25 + 20})`)
            .attr('y', (d, i) => i * 15 + 20)
            .text((d) => d?.data?.label)
            .style('font-size', 10)
            .style('fill', 'red');
    }, [data]);

    return (
        <svg ref={svgRef} />
    );
};

export default LineChart;