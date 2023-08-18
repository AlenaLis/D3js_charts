import { data } from "./data";
import { Scatterplot } from "./Scatterplot";

export const ScarletPlotWrapper = ({ width = 1000, height = 600 }) => (
  <Scatterplot data={data} width={width} height={height} />
);
