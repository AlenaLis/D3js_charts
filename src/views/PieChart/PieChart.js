import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import { useResizeObserver } from './useResizeObserver';

import '../../styles.css'

const PieChart = ({ data, svgWrapperRef, padding }) => {
    const dimensions = useResizeObserver(svgWrapperRef);
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef?.current || !dimensions) return;

        const innerWidth = dimensions?.width;
        const innerHeight = dimensions?.height;
        const radius = Math.min(innerWidth, innerHeight) / 2;

        const svg = d3.select(svgRef?.current);
        svg.selectAll('*').remove();

        const pieGenerator = d3
            .pie()
            .value(({ value }) => value)
            .sort(null);

        const arcGenerator = d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius - padding);

        const slices = pieGenerator([...data]);

        svg
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .append('g')
            .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`)
            .selectAll('path')
            .data(slices)
            .join('path')
            .attr('fill', (d) => d?.data?.fillColor)
            .attr('d', arcGenerator);


        svg
            .selectAll('.legends')
            .data(slices)
            .join('rect')
            .attr('transform', `translate(${innerWidth - innerWidth * 0.25})`)
            .attr('y', (d, i) => i * 15 + 10)
            .attr('width', 12)
            .attr('height', 12)
            .style('fill', (d) => d?.data?.fillColor);

        svg
            .selectAll('.legends-text')
            .data(slices)
            .join('text')
            .attr('transform', `translate(${innerWidth - innerWidth * 0.25 + 20})`)
            .attr('y', (d, i) => i * 15 + 20)
            .text((d) => d?.data?.label)
            .style('font-size', 10)
            .style('fill', (d) => d?.data?.fillColor);

        svg
            .append('g')
            .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`)
            .selectAll('text')
            .data(slices)
            .join('text')
            .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
            .style('fill', 'white')
            .style('font-size', 10)
            .attr('dy', '5px')
            .text((d) => d?.data?.value);
    }, [data, dimensions]);

    return (
        <div className="d3js">
            <svg ref={svgRef} />
        </div>
    );
};

export default PieChart;