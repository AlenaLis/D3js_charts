import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const Scatterplot = ({ width, height, data }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={10}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="#cb1dd1"
        fill="#cb1dd1"
        fillOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
